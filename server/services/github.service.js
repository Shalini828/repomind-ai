const path = require("path");
const fs = require("fs");
const simpleGit = require("simple-git");

exports.cloneRepository = async (repoUrl) => {
  // Validate URL
  const regex = /^https?:\/\/github\.com\/([^/]+)\/([^/]+?)(\.git)?$/;

  const match = repoUrl.match(regex);

  if (!match) {
    throw new Error("Invalid GitHub Repository URL");
  }

  const owner = match[1];
  const repo = match[2];

  const repoName = `${owner}-${repo}`;

  const localPath = path.join(__dirname, "..", "uploads", repoName);

  // Clone only if repository doesn't already exist
 if (!fs.existsSync(localPath)) {
  console.log("📥 Starting clone...");
  console.log("Repository:", repoUrl);
  console.log("Destination:", localPath);

  try {
    await simpleGit().clone(repoUrl, localPath);

    console.log("✅ Repository cloned successfully.");
  } catch (error) {
    console.error("❌ Clone failed:", error);
    throw error;
  }
} else {
  console.log("✅ Repository already exists.");
}

console.log("🔥 cloneRepository() finished");

  return {
    owner,
    repo,
    repoName,
    localPath,
  };
};
