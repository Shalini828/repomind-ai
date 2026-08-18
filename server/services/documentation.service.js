const fs = require("fs");
const path = require("path");

const README_CANDIDATES = ["README.md", "readme.md", "Readme.md"];
const CONTRIBUTING_CANDIDATES = [
  "CONTRIBUTING.md",
  "contributing.md",
  "CONTRIBUTING.MD",
];
const DOC_HINTS = [
  "installation",
  "install",
  "usage",
  "getting started",
  "example",
  "examples",
];

function analyzeDocumentation(repositoryPath) {
  let readmePath = null;
  let contributingPath = null;

  for (const candidate of README_CANDIDATES) {
    const resolved = path.join(repositoryPath, candidate);
    if (fs.existsSync(resolved)) {
      readmePath = resolved;
      break;
    }
  }

  for (const candidate of CONTRIBUTING_CANDIDATES) {
    const resolved = path.join(repositoryPath, candidate);
    if (fs.existsSync(resolved)) {
      contributingPath = resolved;
      break;
    }
  }

  const readmeContent = readmePath ? fs.readFileSync(readmePath, "utf8") : "";
  const contributingContent = contributingPath
    ? fs.readFileSync(contributingPath, "utf8")
    : "";

  const hasInstallation = /installation|install/i.test(readmeContent);
  const hasUsage = /usage|getting started|example|examples/i.test(
    readmeContent,
  );
  const hasContributing =
    /contribut/i.test(contributingContent) ||
    /pull request/i.test(readmeContent);
  const hasLicenseBadge =
    /badge/i.test(readmeContent) && /license/i.test(readmeContent);
  const hasScreenshots = /screenshot|demo|preview/i.test(readmeContent);
  const hasApiDocs = /api|endpoint|swagger|rest/i.test(readmeContent);

  const checks = [
    Boolean(readmeContent),
    hasInstallation,
    hasUsage,
    hasContributing,
    hasLicenseBadge,
    hasScreenshots,
    hasApiDocs,
  ];

  const completeness = Math.round(
    (checks.filter(Boolean).length / checks.length) * 100,
  );
  const score = Math.min(100, 30 + completeness * 0.6);

  return {
    exists: Boolean(readmePath),
    path: readmePath ? path.relative(repositoryPath, readmePath) : null,
    lines: readmeContent ? readmeContent.split(/\r?\n/).length : 0,
    hasInstallation,
    hasUsage,
    hasContributing,
    hasLicenseBadge,
    hasScreenshots,
    hasApiDocs,
    completeness,
    score,
  };
}

module.exports = {
  analyzeDocumentation,
};
