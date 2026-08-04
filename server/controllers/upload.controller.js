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
let owner, repo;
try {
  const urlObj = new URL(repoUrl);
  const pathParts = urlObj.pathname.split("/").filter(Boolean);
  owner = pathParts[0];
  repo = pathParts[1]?.replace(/\.git$/, "");
} catch (err) {
  return res.status(400).json({
    success: false,
    message: "Invalid GitHub URL format",
  });
}

    // Clone Repository
    const repository = await githubService.cloneRepository(repoUrl);

    return res.status(200).json({
      success: true,
      message: "Repository cloned successfully",
      repository,
      status: "analysis_started",
    });

  } catch (error) {
    console.error(error);

    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};