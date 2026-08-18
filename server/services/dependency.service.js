const fs = require("fs");
const path = require("path");

exports.analyzeDependencies = (repoPath) => {
  const packageJson = path.join(repoPath, "package.json");

  if (!fs.existsSync(packageJson)) {
    return {
      total: 0,
      productionCount: 0,
      developmentCount: 0,
      dependencies: [],
      devDependencies: [],
      heavyDependencies: [],
      lockfiles: [],
      outdatedLockfile: false,
      warnings: [],
    };
  }

  const pkg = JSON.parse(fs.readFileSync(packageJson, "utf8"));
  const productionDeps = Object.keys(pkg.dependencies || {});
  const developmentDeps = Object.keys(pkg.devDependencies || {});
  const heavyDependencies = [...productionDeps, ...developmentDeps].filter(
    (name) =>
      [
        "react",
        "next",
        "vue",
        "angular",
        "express",
        "typescript",
        "tailwindcss",
        "vite",
        "webpack",
        "babel",
      ].includes(name),
  );

  const lockfiles = [
    "package-lock.json",
    "npm-shrinkwrap.json",
    "yarn.lock",
    "pnpm-lock.yaml",
  ].filter((file) => fs.existsSync(path.join(repoPath, file)));

  const packageJsonStats = fs.statSync(packageJson);
  let outdatedLockfile = false;

  lockfiles.forEach((lockfile) => {
    const lockPath = path.join(repoPath, lockfile);
    const lockStats = fs.statSync(lockPath);
    if (lockStats.mtimeMs < packageJsonStats.mtimeMs) {
      outdatedLockfile = true;
    }
  });

  const warnings = [];
  if (productionDeps.length + developmentDeps.length > 20) {
    warnings.push("Large dependency footprint detected.");
  }
  if (heavyDependencies.length > 4) {
    warnings.push("Several heavy framework dependencies detected.");
  }
  if (!lockfiles.length) {
    warnings.push("No lockfile detected for reproducible installs.");
  }
  if (outdatedLockfile) {
    warnings.push("Lockfile appears older than package.json.");
  }

  return {
    total: productionDeps.length + developmentDeps.length,
    productionCount: productionDeps.length,
    developmentCount: developmentDeps.length,
    dependencies: productionDeps,
    devDependencies: developmentDeps,
    heavyDependencies,
    lockfiles,
    outdatedLockfile,
    warnings,
  };
};
