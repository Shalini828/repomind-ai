const fs = require("fs");
const path = require("path");

exports.analyzeDependencies = (repoPath) => {

  const packageJson = path.join(
    repoPath,
    "package.json"
  );

  if (!fs.existsSync(packageJson)) {

    return {
      total: 0,
      dependencies: [],
      devDependencies: [],
    };

  }

  const pkg = JSON.parse(
    fs.readFileSync(packageJson, "utf8")
  );

  return {

    total:
      Object.keys(pkg.dependencies || {}).length +
      Object.keys(pkg.devDependencies || {}).length,

    dependencies: Object.keys(
      pkg.dependencies || {}
    ),

    devDependencies: Object.keys(
      pkg.devDependencies || {}
    ),

  };

};