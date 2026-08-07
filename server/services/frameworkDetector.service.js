const fs = require("fs");
const path = require("path");

function detectFramework(repositoryPath) {
  const packagePath = path.join(repositoryPath, "package.json");

  if (!fs.existsSync(packagePath)) {
    return {
      framework: "Unknown",
      packageManager: "Unknown",
      technologies: [],
    };
  }

  const packageJson = JSON.parse(
    fs.readFileSync(packagePath, "utf-8")
  );

  const dependencies = {
    ...packageJson.dependencies,
    ...packageJson.devDependencies,
  };

  const technologies = [];

  if (dependencies.react) technologies.push("React");
  if (dependencies.next) technologies.push("Next.js");
  if (dependencies.vue) technologies.push("Vue");
  if (dependencies.angular) technologies.push("Angular");
  if (dependencies.express) technologies.push("Express");
  if (dependencies.typescript) technologies.push("TypeScript");
  if (dependencies.tailwindcss) technologies.push("Tailwind CSS");
  if (dependencies.vite) technologies.push("Vite");

  let framework = "Node.js";

  if (technologies.includes("Next.js"))
    framework = "Next.js";
  else if (technologies.includes("React"))
    framework = "React";
  else if (technologies.includes("Vue"))
    framework = "Vue";
  else if (technologies.includes("Angular"))
    framework = "Angular";
  else if (technologies.includes("Express"))
    framework = "Express";

  let packageManager = "npm";

  if (fs.existsSync(path.join(repositoryPath, "yarn.lock")))
    packageManager = "Yarn";

  if (fs.existsSync(path.join(repositoryPath, "pnpm-lock.yaml")))
    packageManager = "pnpm";

  return {
    framework,
    packageManager,
    technologies,
  };
}

module.exports = {
  detectFramework,
};