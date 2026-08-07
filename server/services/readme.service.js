const fs = require("fs");
const path = require("path");

exports.analyzeReadme = (repoPath) => {
  const possibleFiles = [
    "README.md",
    "readme.md",
    "README.MD",
    "Readme.md",
  ];

  let readmeFile = null;

  for (const file of possibleFiles) {
    const filePath = path.join(repoPath, file);

    if (fs.existsSync(filePath)) {
      readmeFile = filePath;
      break;
    }
  }

  if (!readmeFile) {
    return {
      exists: false,
      content: "",
      lines: 0,
      hasInstallation: false,
      hasUsage: false,
    };
  }

  const content = fs.readFileSync(readmeFile, "utf8");

  return {
    exists: true,
    content,
    lines: content.split("\n").length,
    hasInstallation: /installation|install/i.test(content),
    hasUsage: /usage|getting started/i.test(content),
  };
};