import { existsSync, readFileSync, writeFileSync } from "node:fs";
import { resolve } from "node:path";

const root = resolve(import.meta.dirname, "..");
const reviewPath = process.argv[2];
const registryPath = resolve(root, "docs/reviews/finding-registry.json");

if (!reviewPath) {
  console.error("Usage: node scripts/record-review.mjs <review-record.json>");
  process.exit(1);
}

const reviewFile = resolve(root, reviewPath);
if (!existsSync(reviewFile)) {
  console.error(`Review record does not exist: ${reviewPath}`);
  process.exit(1);
}

function loadJson(path) {
  try {
    return JSON.parse(readFileSync(path, "utf8"));
  } catch (error) {
    console.error(`Invalid JSON: ${path} (${error.message})`);
    process.exit(1);
  }
}

const review = loadJson(reviewFile);
const registry = loadJson(registryPath);
const required = ["reviewId", "reviewedAt", "pullRequest", "service"];
const missing = required.filter((field) => !review[field]);
if (missing.length > 0 || !Array.isArray(review.findings)) {
  console.error(
    `Review record requires ${required.join(", ")} and a findings array.`,
  );
  process.exit(1);
}

for (const finding of review.findings) {
  const occurrenceKey = finding.occurrenceKey || finding.id;
  if (!occurrenceKey || !finding.title || !finding.category || !finding.severity) {
    console.error(
      "Each finding requires occurrenceKey (or id), title, category, and severity.",
    );
    process.exit(1);
  }

  let aggregate = registry.findings.find(
    (entry) => entry.occurrenceKey === occurrenceKey,
  );
  if (!aggregate) {
    aggregate = {
      occurrenceKey,
      title: finding.title,
      service: finding.service || review.service,
      category: finding.category,
      severity: finding.severity,
      firstSeenAt: review.reviewedAt,
      lastSeenAt: review.reviewedAt,
      occurrenceCount: 0,
      pullRequests: [],
      occurrences: [],
    };
    registry.findings.push(aggregate);
  }

  const alreadyRecorded = aggregate.occurrences.some(
    (occurrence) => occurrence.reviewId === review.reviewId,
  );
  if (alreadyRecorded) continue;

  aggregate.occurrences.push({
    reviewId: review.reviewId,
    pullRequest: review.pullRequest,
    reviewedAt: review.reviewedAt,
    status: finding.status || "open",
    ...(finding.file ? { file: finding.file } : {}),
    ...(finding.line ? { line: finding.line } : {}),
  });
  aggregate.occurrenceCount = aggregate.occurrences.length;
  aggregate.lastSeenAt = review.reviewedAt;
  if (!aggregate.pullRequests.includes(review.pullRequest)) {
    aggregate.pullRequests.push(review.pullRequest);
  }
}

registry.findings.sort(
  (left, right) => right.occurrenceCount - left.occurrenceCount,
);
writeFileSync(registryPath, `${JSON.stringify(registry, null, 2)}\n`);
console.log(`Recorded review ${review.reviewId} in finding registry.`);
