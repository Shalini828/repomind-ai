const test = require("node:test");
const assert = require("node:assert/strict");
const fs = require("fs");
const os = require("os");
const path = require("path");

const structureService = require("../services/repositoryStructure.service");
const documentationService = require("../services/documentation.service");

function createTempRepo() {
  const tempDir = fs.mkdtempSync(path.join(os.tmpdir(), "repomind-ai-"));
  fs.mkdirSync(path.join(tempDir, "src"), { recursive: true });
  fs.mkdirSync(path.join(tempDir, "docs"), { recursive: true });
  fs.mkdirSync(path.join(tempDir, "tests"), { recursive: true });
  fs.writeFileSync(
    path.join(tempDir, "README.md"),
    "# Demo\n\n## Installation\n\nRun npm install.\n\n## Usage\n\nUse it.\n\n## Contributing\n\nPlease open a pull request.\n",
  );
  fs.writeFileSync(
    path.join(tempDir, "package.json"),
    JSON.stringify(
      {
        name: "demo",
        dependencies: { react: "^18.0.0" },
        devDependencies: { vite: "^5.0.0" },
      },
      null,
      2,
    ),
  );
  fs.writeFileSync(path.join(tempDir, ".gitignore"), "node_modules\n.env\n");
  fs.writeFileSync(path.join(tempDir, ".env.example"), "PORT=3000\n");
  return tempDir;
}

test("analyzes repository structure and documentation details", () => {
  const tempDir = createTempRepo();

  const structure = structureService.analyzeRepositoryStructure(tempDir);
  const documentation = documentationService.analyzeDocumentation(tempDir);

  assert.equal(structure.detectedFolders.includes("src"), true);
  assert.equal(structure.detectedFolders.includes("docs"), true);
  assert.equal(structure.missingRecommendedFolders.includes("scripts"), true);
  assert.equal(documentation.hasInstallation, true);
  assert.equal(documentation.hasUsage, true);
  assert.equal(documentation.hasContributing, true);
  assert.equal(documentation.completeness >= 60, true);
});
