const githubApiService = require("../services/githubApi.service");
const analysisService = require("../services/analysis.service");

exports.getRepository = async (req, res) => {
  console.log("========== Repository API ==========");
  console.log(global.currentRepository);
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

    const analysis = await analysisService.analyzeRepository({
      repository,
      repoUrl,
      localRepoPath,
    });

    return res.status(200).json({
      ...repository,

      files: analysis.scanResult.files,
      folders: analysis.scanResult.folders,

      framework: analysis.framework.framework,
      packageManager: analysis.framework.packageManager,
      technologies: analysis.framework.technologies,

      tree: analysis.tree,

      readme: analysis.readme,

      license: analysis.license,

      gitignore: analysis.gitignore,

      dependencies: analysis.dependencies,
      languages: analysis.languages,

      codeQuality: analysis.codeQuality,
      structure: analysis.structure,
      documentation: analysis.documentation,
      metrics: analysis.metrics,
      security: analysis.security,
      gitActivity: analysis.gitActivity,

      health: analysis.health,

      summary: analysis.summary,
      analysis: analysis.analysis,
    });
  } catch (error) {
    console.error(error);

    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};
