const fs = require("fs");
const path = require("path");

function buildTree(directory) {
  const stats = fs.statSync(directory);

  // File
  if (!stats.isDirectory()) {
    return {
      name: path.basename(directory),
      type: "file",
    };
  }

  // Folder
  const children = fs
    .readdirSync(directory)
    .map((item) => buildTree(path.join(directory, item)));

  return {
    name: path.basename(directory),
    type: "folder",
    children,
  };
}

module.exports = {
  buildTree,
};