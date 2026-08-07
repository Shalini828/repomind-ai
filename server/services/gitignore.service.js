const fs = require("fs");
const path = require("path");

exports.checkGitIgnore = (repoPath) => {
  return fs.existsSync(
    path.join(repoPath, ".gitignore")
  );
};