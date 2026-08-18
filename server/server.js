require("dotenv").config();

const express = require("express");
const cors = require("cors");

const uploadRoutes = require("./routes/upload.routes");
const repositoryRoutes = require("./routes/repository.routes");

const app = express();

app.use(cors());
app.use(express.json());

app.use("/upload", uploadRoutes);
app.use("/api/v1/repository", repositoryRoutes);

app.get("/", (req, res) => {
  res.json({
    success: true,
    message: "Welcome to RepoMind AI Backend 🚀",
  });
});

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);

  console.log(
    "GitHub token loaded:",
    process.env.GITHUB_TOKEN ? "YES" : "NO"
  );
});