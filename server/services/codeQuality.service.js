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
];

function analyzeCodeQuality(repositoryPath) {
  const report = {
    filesScanned: 0,
    totalLines: 0,

    todoCount: 0,
    fixmeCount: 0,

    consoleLogs: 0,
    emptyFiles: 0,
    duplicateFiles: [],

    longFiles: [],
    issues: [],
    score: 100,
  };

  const fileNames = new Map();

  function walk(currentPath) {
    const items = fs.readdirSync(currentPath);

    for (const item of items) {
      // Ignore hidden folders and node_modules
      if (
        item === "node_modules" ||
        item === ".git" ||
        item === "dist" ||
        item === "build"
      ) {
        continue;
      }

      const fullPath = path.join(currentPath, item);
      const stat = fs.statSync(fullPath);

      if (stat.isDirectory()) {
        walk(fullPath);
      } else {
        const ext = path.extname(item);

        if (!SOURCE_EXTENSIONS.includes(ext)) continue;

        report.filesScanned++;

        const relativeFile = path.relative(repositoryPath, fullPath);
        const fileName = path.basename(relativeFile).toLowerCase();
        if (fileNames.has(fileName)) {
          fileNames.get(fileName).push(relativeFile);
        } else {
          fileNames.set(fileName, [relativeFile]);
        }

        const content = fs.readFileSync(fullPath, "utf8");

        const lines = content.split(/\r?\n/);

        report.totalLines += lines.length;

        // Empty File
        if (content.trim().length === 0) {
          report.emptyFiles++;

          report.issues.push({
            type: "Empty File",
            file: path.relative(repositoryPath, fullPath),
          });
        }

        // Long File
        if (lines.length > 300) {
          report.longFiles.push({
            file: relativeFile,
            lines: lines.length,
          });
        }

        for (const line of lines) {
          if (line.includes("TODO")) report.todoCount++;

          if (line.includes("FIXME")) report.fixmeCount++;

          if (line.includes("console.log(")) report.consoleLogs++;
        }
      }
    }
  }

  walk(repositoryPath);

  report.duplicateFiles = Array.from(fileNames.entries())
    .filter(([, paths]) => paths.length > 1)
    .map(([name, paths]) => ({
      name,
      files: paths,
    }));

  // Score Calculation
  report.score -= report.todoCount * 2;
  report.score -= report.fixmeCount * 3;
  report.score -= report.consoleLogs;
  report.score -= report.emptyFiles * 5;
  report.score -= report.longFiles.length * 2;
  report.score -= report.duplicateFiles.length * 3;

  if (report.score < 0) report.score = 0;

  // Recommendations
  if (report.todoCount > 0)
    report.issues.push({
      type: "TODO Comments",
      message: `${report.todoCount} TODO comments found.`,
    });

  if (report.fixmeCount > 0)
    report.issues.push({
      type: "FIXME Comments",
      message: `${report.fixmeCount} FIXME comments found.`,
    });

  if (report.consoleLogs > 0)
    report.issues.push({
      type: "Console Logs",
      message: `${report.consoleLogs} console.log statements detected.`,
    });

  if (report.longFiles.length > 0)
    report.issues.push({
      type: "Large Files",
      message: `${report.longFiles.length} large source files detected.`,
    });

  if (report.duplicateFiles.length > 0)
    report.issues.push({
      type: "Duplicate Filenames",
      message: `${report.duplicateFiles.length} duplicate filename groups found.`,
    });

  return report;
}

module.exports = {
  analyzeCodeQuality,
};
