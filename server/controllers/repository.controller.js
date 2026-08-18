const githubApiService = require("../services/githubApi.service");
const analysisService = require("../services/analysis.service");

exports.getRepository = async (req, res) => {
  console.log("========== Repository API ==========");

  try {
    if (!global.currentRepository) {
      return res.status(400).json({
        success: false,
        message: "No repository has been analyzed yet.",
      });
    }

    const {
      repoUrl,
      localRepoPath,
      owner,
      repo,
    } = global.currentRepository;

    console.log("Repository URL:", repoUrl);
    console.log("Local path:", localRepoPath);

    /*
     * IMPORTANT:
     * We do NOT call GitHub REST API here.
     *
     * All analysis is performed on the locally cloned repository.
     */

    const repository =
      await githubApiService.getRepositoryDetails(
        repoUrl,
        localRepoPath
      );

    const analysis =
      await analysisService.analyzeRepository({
        repository,
        repoUrl,
        localRepoPath,
      });

    return res.status(200).json({
      success: true,

      name: repository.name,

      description: repository.description,

      language:
        analysis.languages?.length > 0
          ? analysis.languages.join(", ")
          : "Unknown",

      files: analysis.scanResult.files.length,

      folders: analysis.scanResult.folders.length,

      size: repository.size,

      status: "Completed",

      owner,

      repo,

      branch: repository.branch,

      stats: repository.stats,

      tree: analysis.tree,

      readme: analysis.readme,

      license: analysis.license,

      gitignore: analysis.gitignore,

      dependencies: analysis.dependencies,

      languages: analysis.languages,

      framework: analysis.framework.framework,

      packageManager:
        analysis.framework.packageManager,

      technologies:
        analysis.framework.technologies,

      codeQuality: analysis.codeQuality,

      structure: analysis.structure,

      documentation: analysis.documentation,

      metrics: analysis.metrics,

      security: analysis.security,

      gitActivity: analysis.gitActivity,

      health: analysis.health,

      summary: analysis.summary,

      analysis: analysis.analysis,

      repoUrl,
    });
  } catch (error) {
    console.error("❌ Repository analysis failed:");

    console.error(error);

    return res.status(500).json({
      success: false,
      message:
        error.message ||
        "Repository analysis failed.",
    });
  }
};