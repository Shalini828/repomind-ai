import api from "./api";

export const analyzeGithubRepo = async (repoUrl) => {
  const response = await api.post("/upload/github", {
    repoUrl,
  });

  return response.data;
};