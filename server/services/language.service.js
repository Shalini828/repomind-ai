const fs = require("fs");
const path = require("path");

exports.detectLanguages = (repoPath) => {

  const languages = {};

  function walk(dir) {

    const files = fs.readdirSync(dir);

    files.forEach((file) => {

      const fullPath = path.join(dir, file);

      const stat = fs.statSync(fullPath);

      if (stat.isDirectory()) {

        if (
          file === "node_modules" ||
          file === ".git"
        )
          return;

        walk(fullPath);

      } else {

        const ext = path.extname(file);

        languages[ext] =
          (languages[ext] || 0) + 1;

      }

    });

  }

  walk(repoPath);

  return languages;

};