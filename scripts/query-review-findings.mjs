import { readFileSync } from "node:fs";
import { resolve } from "node:path";

const root = resolve(import.meta.dirname, "..");
const registry = JSON.parse(
  readFileSync(resolve(root, "docs/reviews/finding-registry.json"), "utf8"),
);
const args = process.argv.slice(2);

function option(name) {
  const index = args.indexOf(`--${name}`);
  return index >= 0 ? args[index + 1] : undefined;
}

const terms = args
  .filter((arg, index) => !arg.startsWith("--") && !args[index - 1]?.startsWith("--"))
  .map((term) => term.toLowerCase());
const service = option("service")?.toLowerCase();
const category = option("category")?.toLowerCase();
const severity = option("severity")?.toLowerCase();
const limit = Number(option("limit") || 20);

if (args.includes("--help") || (!terms.length && !service && !category && !severity)) {
  console.log(
    "Usage: node scripts/query-review-findings.mjs <term>... [--service name] [--category name] [--severity level] [--limit n]",
  );
  process.exit(args.includes("--help") ? 0 : 1);
}

function searchable(entry) {
  return [
    entry.occurrenceKey,
    entry.title,
    entry.service,
    entry.category,
    entry.severity,
    ...entry.pullRequests,
    ...entry.occurrences.flatMap((occurrence) => [
      occurrence.pullRequest,
      occurrence.file || "",
    ]),
  ]
    .join(" ")
    .toLowerCase();
}

const results = registry.findings
  .filter((entry) => !service || entry.service.toLowerCase() === service)
  .filter((entry) => !category || entry.category.toLowerCase() === category)
  .filter((entry) => !severity || entry.severity.toLowerCase() === severity)
  .filter((entry) => terms.every((term) => searchable(entry).includes(term)))
  .sort((left, right) => right.occurrenceCount - left.occurrenceCount)
  .slice(0, Number.isInteger(limit) && limit > 0 ? limit : 20);

console.log(JSON.stringify({ count: results.length, findings: results }, null, 2));
