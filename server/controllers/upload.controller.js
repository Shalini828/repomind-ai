const githubService = require("../services/github.service");

exports.analyzeGithubRepo = async (req, res) => {
  try {
    const { repoUrl } = req.body;

    if (!repoUrl) {
      return res.status(400).json({
        success: false,
        message: "Repository URL is required",
      });
    }

    // Validate GitHub URL
    const regex =
      /^https?:\/\/github\.com\/([^/]+)\/([^/]+?)(\.git)?\/?$/;

    const match = repoUrl.trim().match(regex);

    if (!match) {
      return res.status(400).json({
        success: false,
        message: "Invalid GitHub repository URL",
      });
    }

    const owner = match[1];
    const repo = match[2];

    console.log("=================================");
    console.log("🚀 Starting repository analysis");
    console.log("Owner:", owner);
    console.log("Repository:", repo);
    console.log("URL:", repoUrl);
    console.log("=================================");

    // Clone repository locally.
    // This does NOT use GitHub REST API.
    const cloneResult = await githubService.cloneRepository(repoUrl);

    // Store current repository for analysis
    global.currentRepository = {
      repoUrl,
      localRepoPath: cloneResult.localPath,
      owner: cloneResult.owner,
      repo: cloneResult.repo,
      repoName: cloneResult.repoName,
    };

    console.log("=================================");
    console.log("✅ Repository ready for analysis");
    console.log("Local path:", cloneResult.localPath);
    console.log("=================================");

    return res.status(200).json({
      success: true,
      message: "Repository cloned successfully",
      repository: {
        owner: cloneResult.owner,
        repo: cloneResult.repo,
        name: cloneResult.repoName,
      },
      localRepoPath: cloneResult.localPath,
    });
  } catch (error) {
    console.error("❌ Repository import failed:", error);

    return res.status(500).json({
      success: false,
      message: error.message || "Failed to import repository",
    });
  }
};