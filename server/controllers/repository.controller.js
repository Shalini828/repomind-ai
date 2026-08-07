const githubApiService = require("../services/githubApi.service");
const repositoryScanner = require("../services/repositoryScanner.service");
const frameworkDetector = require("../services/frameworkDetector.service");
const fileTreeService = require("../services/fileTree.service");

const readmeService = require("../services/readme.service");
const licenseService = require("../services/license.service");
const gitignoreService = require("../services/gitignore.service");
const dependencyService = require("../services/dependency.service");
const languageService = require("../services/language.service");
const repositoryHealthService = require("../services/repositoryHealth.service");
const summaryService = require("../services/summary.service");

exports.getRepository = async (req, res) => {
  try {

    if (!global.currentRepository) {
      return res.status(400).json({
        success: false,
        message: "No repository has been analyzed yet.",
      });
    }

    const repoUrl = global.currentRepository.repoUrl;
    const localRepoPath = global.currentRepository.localRepoPath;

    // GitHub Metadata
    const repository = await githubApiService.getRepositoryDetails(repoUrl);

    // Local Scan
    const scanResult = repositoryScanner.scanDirectory(localRepoPath);

    // Framework Detection
    const framework = frameworkDetector.detectFramework(localRepoPath);

    // File Tree
    const tree = fileTreeService.buildTree(localRepoPath);

    // README
    const readme = readmeService.analyzeReadme(localRepoPath);

    // License
    const license = licenseService.detectLicense(localRepoPath);

    // Git Ignore
    const gitignore = gitignoreService.checkGitIgnore(localRepoPath);

    // Dependencies
    const dependencies = dependencyService.analyzeDependencies(localRepoPath);

    // Languages
    const languages = languageService.detectLanguages(localRepoPath);

    // Repository Health
    const health = repositoryHealthService.calculateHealth({
      readme,
      license,
      gitignore,
      dependencies,
    });

    // AI Summary
    const summary = summaryService.generateSummary({
      repository,
      scan: scanResult,
      framework,
      health,
    });

    return res.status(200).json({
      ...repository,

      files: scanResult.files,
      folders: scanResult.folders,

      framework: framework.framework,
      packageManager: framework.packageManager,
      technologies: framework.technologies,

      tree,

      readme,

      license,

      gitignore,

      dependencies,

      languages,

      health,

      summary,
    });

  } catch (error) {
    console.error(error);

    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};