const fs = require("fs");
const path = require("path");

exports.getRepositoryDetails = async (repoUrl, localRepoPath) => {
  if (!localRepoPath || !fs.existsSync(localRepoPath)) {
    throw new Error("Local repository not found.");
  }

  const repoName = path.basename(localRepoPath);

  const parts = repoUrl
    .replace(/\.git$/, "")
    .split("/")
    .filter(Boolean);

  const owner = parts[parts.length - 2] || "Unknown";
  const repo = parts[parts.length - 1] || repoName;

  // Count local files and folders
  let files = 0;
  let folders = 0;

  const ignoredDirectories = new Set([
    ".git",
    "node_modules",
    ".next",
    "dist",
    "build",
    "coverage",
  ]);

  function scanDirectory(directory) {
    const entries = fs.readdirSync(directory, {
      withFileTypes: true,
    });

    for (const entry of entries) {
      if (entry.name.startsWith(".git")) {
        continue;
      }

      if (ignoredDirectories.has(entry.name)) {
        continue;
      }

      const fullPath = path.join(directory, entry.name);

      if (entry.isDirectory()) {
        folders++;
        scanDirectory(fullPath);
      } else {
        files++;
      }
    }
  }

  scanDirectory(localRepoPath);

  // Calculate repository size
  function calculateSize(directory) {
    let total = 0;

    const entries = fs.readdirSync(directory, {
      withFileTypes: true,
    });

    for (const entry of entries) {
      if (entry.name.startsWith(".git")) {
        continue;
      }

      if (ignoredDirectories.has(entry.name)) {
        continue;
      }

      const fullPath = path.join(directory, entry.name);

      if (entry.isDirectory()) {
        total += calculateSize(fullPath);
      } else {
        try {
          total += fs.statSync(fullPath).size;
        } catch {
          // Ignore inaccessible files
        }
      }
    }

    return total;
  }

  const sizeInBytes = calculateSize(localRepoPath);
  const sizeInKB = sizeInBytes / 1024;

  let size;

  if (sizeInKB < 1024) {
    size = `${sizeInKB.toFixed(2)} KB`;
  } else {
    size = `${(sizeInKB / 1024).toFixed(2)} MB`;
  }

  return {
    name: `${owner}/${repo}`,

    description:
      "Repository cloned locally and ready for RepoMind AI analysis.",

    language: "Detecting...",

    files,

    folders,

    size,

    status: "Completed",

    summary:
      `${owner}/${repo} was cloned locally. ` +
      `RepoMind AI analyzed ${files} files across ${folders} directories.`,

    stats: [
      {
        title: "📁 Files",
        value: files.toLocaleString(),
      },
      {
        title: "📂 Folders",
        value: folders.toLocaleString(),
      },
      {
        title: "📦 Size",
        value: size,
      },
      {
        title: "🌐 Source",
        value: "GitHub",
      },
    ],

    owner,
    repo,
    branch: "main",
  };
};