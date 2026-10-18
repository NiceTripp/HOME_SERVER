import { existsSync, readFileSync } from "node:fs";
import { resolve } from "node:path";

const root = resolve(import.meta.dirname, "..");
const errors = [];

function read(relativePath) {
  const absolutePath = resolve(root, relativePath);
  if (!existsSync(absolutePath)) {
    errors.push(`Missing required file: ${relativePath}`);
    return "";
  }
  return readFileSync(absolutePath, "utf8");
}

function assertFile(relativePath) {
  if (!existsSync(resolve(root, relativePath))) {
    errors.push(`Referenced file does not exist: ${relativePath}`);
  }
}

const catalog = read("docs/architecture/service-catalog.yaml");
const graph = read("docs/architecture/dependency-graph.yaml");
const memoryIndex = read("memory/index.yaml");
const findingSchema = read("docs/reviews/finding.schema.json");
const summarySchema = read("docs/reviews/summary.schema.json");
const reviewRecordSchema = read("docs/reviews/review-record.schema.json");
const findingRegistrySchema = read("docs/reviews/finding-registry.schema.json");
const findingRegistry = read("docs/reviews/finding-registry.json");
read("docs/architecture/data-flow.md");
read(".github/instructions/agent-instructions.instructions.md");
read("AGENTS.md");
read("docs/agent-onboarding.md");
read("TODO.md");

for (const match of memoryIndex.matchAll(/path:\s*([^\s#]+)/g)) {
  assertFile(match[1]);
}

for (const match of catalog.matchAll(/runbook:\s*([^\s#]+)/g)) {
  assertFile(match[1]);
}

for (const match of catalog.matchAll(/contract:\s*([^\s#]+)/g)) {
  assertFile(match[1]);
}

for (const match of catalog.matchAll(/^    path:\s*([^\s#]+)/gm)) {
  assertFile(match[1]);
}

const services = new Set(
  [...catalog.matchAll(/^ {2}([a-z0-9][a-z0-9-]*):\s*$/gm)].map(
    (match) => match[1],
  ),
);

for (const match of graph.matchAll(/from:\s*([^\s#]+)|to:\s*([^\s#]+)/g)) {
  const service = match[1] ?? match[2];
  if (!services.has(service)) {
    errors.push(`Dependency graph references unknown service: ${service}`);
  }
}

for (const [relativePath, content] of [
  ["docs/reviews/finding.schema.json", findingSchema],
  ["docs/reviews/summary.schema.json", summarySchema],
  ["docs/reviews/review-record.schema.json", reviewRecordSchema],
  ["docs/reviews/finding-registry.schema.json", findingRegistrySchema],
  ["docs/reviews/finding-registry.json", findingRegistry],
]) {
  try {
    JSON.parse(content);
  } catch (error) {
    errors.push(`Invalid JSON: ${relativePath} (${error.message})`);
  }
}

const forbiddenFiles = [".env", ".env.local", "id_rsa"];
for (const relativePath of forbiddenFiles) {
  if (existsSync(resolve(root, relativePath))) {
    errors.push(`Forbidden sensitive file exists in repository root: ${relativePath}`);
  }
}

if (errors.length > 0) {
  console.error("Context validation failed:");
  for (const error of errors) console.error(`- ${error}`);
  process.exitCode = 1;
} else {
  console.log("Context validation passed.");
}
