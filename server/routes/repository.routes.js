const express = require("express");
const router = express.Router();

const {
  getRepository,
} = require("../controllers/repository.controller");

router.get("/", getRepository);

module.exports = router;