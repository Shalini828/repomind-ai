const githubApiService = require("../services/githubApi.service");
const repositoryScanner = require("../services/repositoryScanner.service");
const frameworkDetector = require("../services/frameworkDetector.service");
const path = require("path");

exports.getRepository = async (req, res) => {
  try {
    const repoUrl = "https://github.com/facebook/react";

    // Fetch GitHub metadata
    const repository = await githubApiService.getRepositoryDetails(repoUrl);

    // Path of cloned repository
    const localRepoPath = path.join(__dirname, "..", "uploads", "react-react");

    const scanResult = repositoryScanner.scanDirectory(localRepoPath);

    const framework = frameworkDetector.detectFramework(localRepoPath);

    repository.files = scanResult.files;
    repository.folders = scanResult.folders;

    repository.framework = framework.framework;
    repository.packageManager = framework.packageManager;
    repository.technologies = framework.technologies;

    return res.status(200).json(repository);
  } catch (error) {
    console.error(error);

    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};
