exports.calculateHealth = ({
  readme,
  license,
  gitignore,
  dependencies,
  files,
  folders,
  framework,
  analysis = {},
}) => {
  let score = 0;

  // Documentation
  if (readme.exists) score += 15;
  if (readme.hasInstallation) score += 8;
  if (readme.hasUsage) score += 7;
  if (license !== "Not Found") score += 10;

  // Repository setup
  if (gitignore) score += 8;
  if (dependencies.total > 0) score += 10;
  if (framework !== "Unknown") score += 8;

  // Project size
  if (files > 10) score += 8;
  if (folders > 3) score += 6;

  // Deeper analysis
  if (analysis.codeQuality)
    score += Math.min(10, analysis.codeQuality.score / 10);
  if (analysis.structure)
    score += Math.min(8, Math.round(analysis.structure.score / 12));
  if (analysis.documentation)
    score += Math.min(8, Math.round(analysis.documentation.score / 12));
  if (analysis.metrics)
    score += Math.min(8, Math.round(analysis.metrics.score / 12));
  if (analysis.security)
    score += Math.min(8, Math.round(analysis.security.score / 12));
  if (analysis.gitActivity)
    score += Math.min(6, Math.round(analysis.gitActivity.score / 16));

  score += 5;

  if (score > 100) score = 100;

  let grade = "Poor";

  if (score >= 90) grade = "Excellent";
  else if (score >= 75) grade = "Good";
  else if (score >= 60) grade = "Average";

  return {
    score,
    grade,
    breakdown: {
      documentation: readme.exists ? 1 : 0,
      structure: analysis.structure ? analysis.structure.score : 0,
      security: analysis.security ? analysis.security.score : 0,
      dependencies: dependencies.total > 0 ? 1 : 0,
      maintainability: analysis.codeQuality ? analysis.codeQuality.score : 0,
      configuration: gitignore ? 1 : 0,
    },
  };
};
