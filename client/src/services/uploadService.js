import api from "./api";

export const analyzeGithubRepo = async (repoUrl) => {
  const response = await api.post("/upload/github", {
    repoUrl,
  });

  return response.data;
};

export const getRepositoryAnalysis = async () => {
  const response = await api.get("/api/v1/repository");

  return response.data;
};