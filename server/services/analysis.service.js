const repositoryScanner = require("./repositoryScanner.service");
const frameworkDetector = require("./frameworkDetector.service");
const fileTreeService = require("./fileTree.service");
const readmeService = require("./readme.service");
const licenseService = require("./license.service");
const gitignoreService = require("./gitignore.service");
const dependencyService = require("./dependency.service");
const languageService = require("./language.service");
const codeQualityService = require("./codeQuality.service");
const repositoryHealthService = require("./repositoryHealth.service");
const summaryService = require("./summary.service");
const repositoryStructureService = require("./repositoryStructure.service");
const documentationService = require("./documentation.service");
const metricsService = require("./metrics.service");
const securityService = require("./security.service");
const gitAnalysisService = require("./gitAnalysis.service");

async function analyzeRepository({ repository, repoUrl, localRepoPath }) {
  const scanResult = repositoryScanner.scanDirectory(localRepoPath);
  const framework = frameworkDetector.detectFramework(localRepoPath);
  const tree = fileTreeService.buildTree(localRepoPath);
  const readme = readmeService.analyzeReadme(localRepoPath);
  const license = licenseService.detectLicense(localRepoPath);
  const gitignore = gitignoreService.checkGitIgnore(localRepoPath);
  const dependencies = dependencyService.analyzeDependencies(localRepoPath);
  const languages = languageService.detectLanguages(localRepoPath);
  const codeQuality = codeQualityService.analyzeCodeQuality(localRepoPath);
  const structure =
    repositoryStructureService.analyzeRepositoryStructure(localRepoPath);
  const documentation =
    documentationService.analyzeDocumentation(localRepoPath);
  const metrics = metricsService.analyzeMetrics(localRepoPath);
  const security = securityService.analyzeSecurity(localRepoPath, gitignore);
  const gitActivity =
    await gitAnalysisService.analyzeGitActivity(localRepoPath);

  const health = repositoryHealthService.calculateHealth({
    readme,
    license,
    gitignore,
    dependencies,
    files: scanResult.files,
    folders: scanResult.folders,
    framework: framework.framework,
    analysis: {
      codeQuality,
      structure,
      documentation,
      metrics,
      security,
      gitActivity,
    },
  });

  const summary = summaryService.generateSummary({
    repository,
    scan: scanResult,
    framework,
    health,
    dependencies,
    readme,
    analysis: {
      codeQuality,
      structure,
      documentation,
      metrics,
      security,
      gitActivity,
    },
  });

  return {
    repositoryMeta: repository,
    scanResult,
    framework,
    tree,
    readme,
    license,
    gitignore,
    dependencies,
    languages,
    codeQuality,
    structure,
    documentation,
    metrics,
    security,
    gitActivity,
    health,
    summary,
    analysis: {
      codeQuality,
      structure,
      documentation,
      metrics,
      security,
      gitActivity,
      health,
      summary,
    },
    repoUrl,
    localRepoPath,
  };
}

module.exports = {
  analyzeRepository,
};
