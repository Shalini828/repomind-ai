const fs = require("fs");
const path = require("path");

function scanDirectory(directory) {
  let files = 0;
  let folders = 0;

  let readmeContent = "";

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

        // Read README.md
        if (item.toLowerCase() === "readme.md") {
          try {
            readmeContent = fs.readFileSync(fullPath, "utf8");
          } catch (err) {
            console.log("Couldn't read README");
          }
        }
      }
    });
  }

  walk(directory);

  return {
    files,
    folders,
    readmeContent,
  };
}

module.exports = {
  scanDirectory,
};