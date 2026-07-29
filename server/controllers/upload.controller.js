const axios = require("axios");
exports.analyzeGithubRepo = async (req, res) => {
  try {
    const { repoUrl } = req.body;

    if (!repoUrl) {
      return res.status(400).json({
        success: false,
        message: "Repository URL is required",
      });
    }
const parts = repoUrl.split("/");
const owner = parts[3];
const repo = parts[4];
const response = await axios.get(`https://api.github.com/repos/${owner}/${repo}/contents`);
    return res.status(200).json({
      success: true,
      message: "Repository received successfully",
      files: response.data,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};