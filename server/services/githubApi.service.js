const { Octokit } = require("@octokit/rest");

const octokit = new Octokit();

exports.getRepositoryDetails = async (repoUrl) => {
  const regex = /^https?:\/\/github\.com\/([^/]+)\/([^/]+?)(\.git)?$/;

  const match = repoUrl.match(regex);

  if (!match) {
    throw new Error("Invalid GitHub Repository URL");
  }

  const owner = match[1];
  const repo = match[2];

  const { data } = await octokit.repos.get({
    owner,
    repo,
  });

 return {
  name: data.full_name,

  description: data.description || "No description available.",

  language: data.language || "Unknown",

  files: "-",

  folders: "-",

  size: `${(data.size / 1024).toFixed(2)} MB`,

  status: "Completed",

  summary: `Repository ${data.full_name} was successfully fetched from GitHub. AI analysis will begin after repository scanning.`,

  stats: [
    {
      title: "⭐ Stars",
      value: data.stargazers_count.toLocaleString(),
    },
    {
      title: "🍴 Forks",
      value: data.forks_count.toLocaleString(),
    },
    {
      title: "🐞 Open Issues",
      value: data.open_issues_count.toLocaleString(),
    },
    {
      title: "🌿 Default Branch",
      value: data.default_branch,
    },
  ],
};
};