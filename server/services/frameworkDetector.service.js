const fs = require("fs");
const path = require("path");

function exists(repoPath, file) {
  return fs.existsSync(path.join(repoPath, file));
}

function detectArduino(repoPath) {
  const files = fs.readdirSync(repoPath);

  return files.some((file) => file.endsWith(".ino"));
}

function detectFramework(repositoryPath) {
  let framework = "Unknown";
  let packageManager = "None";
  let technologies = [];

  // -------------------------
  // JavaScript / TypeScript
  // -------------------------
  const packagePath = path.join(repositoryPath, "package.json");

  if (fs.existsSync(packagePath)) {
    const packageJson = JSON.parse(
      fs.readFileSync(packagePath, "utf8")
    );

    const dependencies = {
      ...(packageJson.dependencies || {}),
      ...(packageJson.devDependencies || {}),
    };

    if (dependencies.react) technologies.push("React");
    if (dependencies.next) technologies.push("Next.js");
    if (dependencies.vue) technologies.push("Vue");
    if (dependencies.angular) technologies.push("Angular");
    if (dependencies.express) technologies.push("Express");
    if (dependencies.typescript) technologies.push("TypeScript");
    if (dependencies.tailwindcss) technologies.push("Tailwind CSS");
    if (dependencies.vite) technologies.push("Vite");

    framework = "Node.js";

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

    if (exists(repositoryPath, "pnpm-lock.yaml"))
      packageManager = "pnpm";
    else if (exists(repositoryPath, "yarn.lock"))
      packageManager = "Yarn";
    else
      packageManager = "npm";
  }

  // -------------------------
  // Python
  // -------------------------
  if (exists(repositoryPath, "requirements.txt")) {
    framework = "Python";
    technologies.push("Python");
  }

  if (exists(repositoryPath, "pyproject.toml")) {
    framework = "Python";
    technologies.push("Poetry");
  }

  // -------------------------
  // Java
  // -------------------------
  if (exists(repositoryPath, "pom.xml")) {
    framework = "Spring Boot";
    packageManager = "Maven";
    technologies.push("Java");
  }

  if (exists(repositoryPath, "build.gradle")) {
    framework = "Gradle";
    packageManager = "Gradle";
    technologies.push("Java");
  }

  // -------------------------
  // Flutter
  // -------------------------
  if (exists(repositoryPath, "pubspec.yaml")) {
    framework = "Flutter";
    packageManager = "Pub";
    technologies.push("Flutter");
  }

  // -------------------------
  // Rust
  // -------------------------
  if (exists(repositoryPath, "Cargo.toml")) {
    framework = "Rust";
    packageManager = "Cargo";
    technologies.push("Rust");
  }

  // -------------------------
  // Go
  // -------------------------
  if (exists(repositoryPath, "go.mod")) {
    framework = "Go";
    technologies.push("Go");
  }

  // -------------------------
  // .NET
  // -------------------------
  const files = fs.readdirSync(repositoryPath);

  if (files.some((file) => file.endsWith(".csproj"))) {
    framework = ".NET";
    technologies.push("C#");
  }

  // -------------------------
  // CMake
  // -------------------------
  if (exists(repositoryPath, "CMakeLists.txt")) {
    framework = "CMake";
    technologies.push("C++");
  }

  // -------------------------
  // Arduino
  // -------------------------
  if (
    detectArduino(repositoryPath) ||
    exists(repositoryPath, "platformio.ini")
  ) {
    framework = "Arduino";
    packageManager = "None";
    technologies.push("Arduino");
  }

  return {
    framework,
    packageManager,
    technologies: [...new Set(technologies)],
  };
}

module.exports = {
  detectFramework,
};