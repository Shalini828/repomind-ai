const express = require("express");

const router = express.Router();

const {
  analyzeGithubRepo,
} = require("../controllers/upload.controller");

router.post("/github", analyzeGithubRepo);

module.exports = router;