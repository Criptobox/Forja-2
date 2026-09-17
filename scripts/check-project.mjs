import { existsSync } from "node:fs";

const required = [
  "README.md",
  "AGENTS.md",
  "docs/BUILD_PROGRESS.md",
  "docs/PRODUCT.md",
  "docs/ARCHITECTURE.md",
  "docs/DESIGN.md",
  "docs/AGENT.md",
  "docs/RESEARCH_MATRIX.md",
  "docs/ROADMAP.md",
  "VERSION.json",
  "design/logo/forja-mark.svg",
  "design/mascot/forja-forger.svg"
];

const missing = required.filter((file) => !existsSync(file));

if (missing.length) {
  console.error("Missing:", missing.join(", "));
  process.exit(1);
}

console.log("FORJA base check: OK");
