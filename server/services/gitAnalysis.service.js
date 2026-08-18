const fs = require("fs");
const path = require("path");
const simpleGit = require("simple-git");

function analyzeGitActivity(repositoryPath) {
  const git = simpleGit(repositoryPath);
  const result = {
    recentCommits: [],
    contributors: [],
    branchInfo: null,
    lastUpdated: null,
    score: 100,
  };

  try {
    const status = fs.existsSync(path.join(repositoryPath, ".git"));
    if (!status) return result;

    const log = git.log({ n: 5 });
    const branches = git.branch();
    const raw = git.raw(["shortlog", "-sne", "--all"]);

    return Promise.all([log, branches, raw]).then(
      ([logResult, branchResult, contributorResult]) => {
        result.recentCommits = (logResult.all || [])
          .slice(0, 5)
          .map((commit) => ({
            hash: commit.hash.slice(0, 8),
            message: commit.message,
            date: commit.date,
          }));

        result.contributors = contributorResult
          .trim()
          .split(/\n/)
          .filter(Boolean)
          .slice(0, 8)
          .map((entry) => entry.trim());

        result.branchInfo = {
          current: branchResult.current,
          all: (branchResult.all || []).slice(0, 10),
        };

        const latestCommitDate =
          logResult.all && logResult.all[0]
            ? new Date(logResult.all[0].date)
            : null;
        result.lastUpdated = latestCommitDate
          ? latestCommitDate.toISOString()
          : null;

        if (!result.recentCommits.length) result.score -= 20;
        if (!result.contributors.length) result.score -= 20;
        if (!result.branchInfo.current) result.score -= 10;

        result.score = Math.max(0, Math.min(100, result.score));
        return result;
      },
    );
  } catch (error) {
    return Promise.resolve(result);
  }
}

module.exports = {
  analyzeGitActivity,
};
