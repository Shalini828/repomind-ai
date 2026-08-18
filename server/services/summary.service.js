exports.generateSummary = ({
  repository,
  scan,
  framework,
  health,
  dependencies = { total: 0 },
  readme = { exists: false },
  analysis = {},
}) => {
  const projectName = repository.name;
  const language = repository.language || "Unknown";
  const frameworkName =
    framework.framework !== "Unknown" ? framework.framework : language;

  const structureStrength =
    analysis.structure?.missingRecommendedFolders?.length === 0
      ? "well-organized"
      : "moderately organized";
  const docStrength =
    readme.exists && readme.hasInstallation && readme.hasUsage
      ? "well documented"
      : "partially documented";
  const securityStatus = analysis.security?.sensitiveFiles?.length
    ? "needs additional hardening"
    : "has a clean baseline";

  let summary = `### Project Overview\n\n`;

  summary += `${projectName} is a **${frameworkName}** project primarily written in **${language}**. `;
  summary += `The repository contains **${scan.files} files** organized into **${scan.folders} directories**, indicating a ${structureStrength} project architecture.\n\n`;

  summary += `### Repository Health\n\n`;
  summary += `The overall repository health score is **${health.score}/100 (${health.grade})**. `;
  summary += `The project is ${docStrength} and ${securityStatus}, with ${dependencies.total} dependency references detected across the codebase.\n\n`;

  summary += `### Strengths\n\n`;
  if (readme.exists)
    summary += "- Documentation is present and provides onboarding context.\n";
  if (analysis.structure?.detectedFolders?.length)
    summary += `- The repository includes a recognizable structure with folders such as ${analysis.structure.detectedFolders.slice(0, 5).join(", ")}\.\n`;
  if (analysis.codeQuality?.score >= 70)
    summary +=
      "- The implementation appears maintainable with relatively low noise in the source tree.\n";
  if (analysis.metrics?.totalLines)
    summary += `- The codebase spans approximately ${analysis.metrics.totalLines} lines across ${analysis.metrics.totalFiles} files.\n`;

  summary += `\n### Areas for Improvement\n\n`;
  if (!readme.exists || !readme.hasInstallation || !readme.hasUsage)
    summary +=
      "- Expand the README with installation, usage, and contribution guidance.\n";
  if (analysis.structure?.missingRecommendedFolders?.length)
    summary += `- Add recommended folders such as ${analysis.structure.missingRecommendedFolders.slice(0, 4).join(", ")}.\n`;
  if (analysis.codeQuality?.emptyFiles)
    summary += `- Review ${analysis.codeQuality.emptyFiles} empty or near-empty files.\n`;
  if (analysis.dependencies?.warnings?.length)
    summary += `- Address dependency concerns: ${analysis.dependencies.warnings.join(" ")}\n`;

  summary += `\n### Recommendation\n\n`;
  if (health.score >= 80) {
    summary +=
      "The repository appears ready for detailed AI-powered code review, documentation generation, and architectural analysis.";
  } else if (health.score >= 60) {
    summary +=
      "Improving documentation, adding project metadata, and strengthening repository structure would enhance overall code quality before advanced AI analysis.";
  } else {
    summary +=
      "Focus on documentation, repository organization, and project configuration before proceeding with deeper AI analysis.";
  }

  return summary;
};
