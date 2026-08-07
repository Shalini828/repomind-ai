exports.generateSummary = ({
  repository,
  scan,
  framework,
  health,
}) => {

  return `
${repository.name} is a ${repository.language} project.

The repository contains ${scan.files} files and ${scan.folders} folders.

Framework detected: ${framework.framework}.

Repository health score is ${health.score}/100 (${health.grade}).

The project appears to be well organized and suitable for further AI code review.
`.trim();

};