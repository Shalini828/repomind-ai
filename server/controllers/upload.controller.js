exports.analyzeGithubRepo = async (req, res) => {
  try {
    const { repoUrl } = req.body;

    if (!repoUrl) {
      return res.status(400).json({
        success: false,
        message: "Repository URL is required",
      });
    }

    return res.status(200).json({
      success: true,
      message: "Repository received successfully",
      repoUrl,
      status: "analysis_started",
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};