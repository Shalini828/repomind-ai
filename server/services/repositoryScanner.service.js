const fs = require("fs");
const path = require("path");

function scanDirectory(directory) {
  let files = 0;
  let folders = 0;

  function walk(currentPath) {
    const items = fs.readdirSync(currentPath);

    items.forEach((item) => {
      const fullPath = path.join(currentPath, item);

      const stat = fs.statSync(fullPath);

      if (stat.isDirectory()) {
        folders++;
        walk(fullPath);
      } else {
        files++;
      }
    });
  }

  walk(directory);

  return {
    files,
    folders,
  };
}

module.exports = {
  scanDirectory,
};