const fs = require("fs");
const path = require("path");

const SENSITIVE_FILE_NAMES = [
  ".env",
  ".env.local",
  ".env.production",
  ".env.development",
  ".env.example",
  "id_rsa",
  "id_dsa",
  "credentials.json",
  "token.txt",
  "secrets.txt",
];

const SECRET_PATTERNS = [
  /AKIA[0-9A-Z]{16}/,
  /AIza[0-9A-Za-z\-_]{35}/,
  /ghp_[A-Za-z0-9]{36}/,
  /xox[baprs]-[A-Za-z0-9-]{10,}/,
  /BEGIN PRIVATE KEY/,
  /password\s*[:=]\s*[\w\-!@#$%^&*()+=]{3,}/i,
];

function analyzeSecurity(repositoryPath, gitignoreExists) {
  const findings = [];
  const sensitiveFiles = [];
  let secretMatches = 0;

  function walk(currentPath) {
    const entries = fs.readdirSync(currentPath, { withFileTypes: true });

    for (const entry of entries) {
      if (entry.isDirectory()) {
        if (
          [".git", "node_modules", "dist", "build", "coverage"].includes(
            entry.name,
          )
        )
          continue;
        walk(path.join(currentPath, entry.name));
        continue;
      }

      const fullPath = path.join(currentPath, entry.name);
      const relativePath = path.relative(repositoryPath, fullPath);

      if (SENSITIVE_FILE_NAMES.includes(entry.name)) {
        sensitiveFiles.push(relativePath);
      }

      if (entry.name.match(/\.(env|pem|key|p12|pfx)$/)) {
        sensitiveFiles.push(relativePath);
      }

      try {
        const content = fs.readFileSync(fullPath, "utf8");
        if (SECRET_PATTERNS.some((pattern) => pattern.test(content))) {
          secretMatches++;
          findings.push({
            type: "Potential Secret",
            file: relativePath,
          });
        }
      } catch (error) {
        // ignore binary or unreadable files
      }
    }
  }

  walk(repositoryPath);

  const score = Math.max(
    0,
    100 -
      sensitiveFiles.length * 15 -
      secretMatches * 10 -
      (gitignoreExists ? 0 : 10),
  );

  return {
    sensitiveFiles,
    secretMatches,
    findings,
    hasGitignoreCoverage: Boolean(gitignoreExists),
    score,
  };
}

module.exports = {
  analyzeSecurity,
};
