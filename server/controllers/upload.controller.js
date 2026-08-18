const axios = require("axios");
const fetchRepoContents = async (owner, repo, path = "") => {
  const response = await axios.get(
    `https://api.github.com/repos/${owner}/${repo}/contents/${path}`,
    { timeout: 5000 }
  );

  const items = response.data;
  let allFiles = [];

  for (const item of items) {
    if (item.type === "file") {
      allFiles.push({
        name: item.name,
        path: item.path,
        type: "file",
      });
    } else if (item.type === "dir") {
      allFiles.push({
        name: item.name,
        path: item.path,
        type: "dir",
      });
      // yahi hai recursion - function khud ko dubara call kar raha hai
      const nestedFiles = await fetchRepoContents(owner, repo, item.path);
      allFiles = allFiles.concat(nestedFiles);
    }
  }

  return allFiles;
};

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
const cleanedFiles = await fetchRepoContents(owner,repo);
    return res.status(200).json({
      success: true,
      message: "Repository fetched successfully",
      files: cleanedFiles,
    });
  } catch (error) {
    if (error.code === "ECONNABORTED") {
      return res.status(504).json({
        success: false,
        message: "GitHub API request timed out. Please try again.",
      });
    }

    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};
