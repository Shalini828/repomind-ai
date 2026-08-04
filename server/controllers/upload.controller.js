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

if (!owner || !repo) {
  return res.status(400).json({
    success: false,
    message: "Could not extract owner/repo from URL",
  });
}
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