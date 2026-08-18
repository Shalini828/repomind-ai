const fs = require("fs");
const path = require("path");

const RECOMMENDED_FOLDERS = [
  "src",
  "docs",
  "tests",
  "config",
  "scripts",
  "assets",
  "examples",
];
const IGNORED_DIRECTORIES = new Set([
  ".git",
  "node_modules",
  "dist",
  "build",
  "coverage",
  ".next",
  "out",
  ".venv",
  "vendor",
]);

function analyzeRepositoryStructure(repositoryPath) {
  const detectedFolders = [];
  const folderStats = [];
  const deeplyNestedFolders = [];

  function walk(currentPath, depth = 0) {
    const entries = fs.readdirSync(currentPath, { withFileTypes: true });

    for (const entry of entries) {
      if (!entry.isDirectory()) continue;

      if (IGNORED_DIRECTORIES.has(entry.name)) continue;

      const fullPath = path.join(currentPath, entry.name);
      const relativePath = path.relative(repositoryPath, fullPath) || ".";

      const childEntries = fs.readdirSync(fullPath, { withFileTypes: true });
      const fileCount = childEntries.filter((item) => item.isFile()).length;
      const folderCount = childEntries.filter((item) =>
        item.isDirectory(),
      ).length;

      detectedFolders.push(entry.name);
      folderStats.push({
        name: relativePath,
        depth,
        fileCount,
        folderCount,
      });

      if (depth >= 2) {
        deeplyNestedFolders.push({
          name: relativePath,
          depth,
        });
      }

      walk(fullPath, depth + 1);
    }
  }

  walk(repositoryPath);

  const uniqueFolders = [...new Set(detectedFolders)].sort();
  const missingRecommendedFolders = RECOMMENDED_FOLDERS.filter(
    (folder) => !uniqueFolders.includes(folder),
  );

  const largestFolders = [...folderStats]
    .sort((a, b) => b.fileCount - a.fileCount)
    .slice(0, 8);

  const score = Math.min(
    100,
    40 +
      uniqueFolders.filter((folder) => RECOMMENDED_FOLDERS.includes(folder))
        .length *
        8 -
      deeplyNestedFolders.length * 2,
  );

  return {
    detectedFolders: uniqueFolders,
    missingRecommendedFolders,
    recommendedFolders: RECOMMENDED_FOLDERS,
    largestFolders,
    deeplyNestedFolders,
    score,
  };
}

module.exports = {
  analyzeRepositoryStructure,
  RECOMMENDED_FOLDERS,
};
