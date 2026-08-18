const fs = require("fs");
const path = require("path");

const SOURCE_EXTENSIONS = [
  ".js",
  ".jsx",
  ".ts",
  ".tsx",
  ".py",
  ".java",
  ".cpp",
  ".c",
  ".h",
  ".hpp",
  ".cs",
  ".go",
  ".rs",
  ".php",
  ".rb",
  ".swift",
  ".kt",
  ".md",
  ".json",
  ".yml",
  ".yaml",
  ".xml",
  ".ini",
  ".toml",
];

const IGNORED_DIRECTORIES = new Set([
  ".git",
  "node_modules",
  "dist",
  "build",
  "coverage",
  ".next",
  "out",
]);

function analyzeMetrics(repositoryPath) {
  const fileTypeDistribution = {};
  const files = [];
  let totalLines = 0;
  let totalSize = 0;

  function walk(currentPath) {
    const entries = fs.readdirSync(currentPath, { withFileTypes: true });

    for (const entry of entries) {
      if (entry.name.startsWith(".")) {
        if ([".git", ".github"].includes(entry.name)) {
          // allow .github to be traversed if needed
        } else if (entry.name === ".git") {
          continue;
        }
      }

      if (entry.isDirectory()) {
        if (IGNORED_DIRECTORIES.has(entry.name)) continue;
        walk(path.join(currentPath, entry.name));
        continue;
      }

      const fullPath = path.join(currentPath, entry.name);
      const ext = path.extname(entry.name).toLowerCase();
      const stat = fs.statSync(fullPath);
      const relativePath = path.relative(repositoryPath, fullPath);

      fileTypeDistribution[ext || "(no extension)"] =
        (fileTypeDistribution[ext || "(no extension)"] || 0) + 1;
      totalSize += stat.size;

      if (SOURCE_EXTENSIONS.includes(ext) || ext === ".md") {
        try {
          const content = fs.readFileSync(fullPath, "utf8");
          totalLines += content.split(/\r?\n/).length;
        } catch (error) {
          // ignore unreadable files
        }
      }

      files.push({
        path: relativePath,
        size: stat.size,
        extension: ext || "(no extension)",
      });
    }
  }

  walk(repositoryPath);

  const sortedFiles = files.sort((a, b) => b.size - a.size);
  const largestFiles = sortedFiles.slice(0, 8);

  const averageFileSize =
    files.length > 0 ? Math.round(totalSize / files.length) : 0;
  const totalFiles = files.length;
  const score = Math.min(
    100,
    30 + Math.round((totalFiles / 100) * 10) + (totalLines > 1000 ? 10 : 0),
  );

  return {
    totalFiles,
    totalLines,
    averageFileSize,
    totalSize,
    fileTypeDistribution,
    largestFiles,
    score,
  };
}

module.exports = {
  analyzeMetrics,
};
