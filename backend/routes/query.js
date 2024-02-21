const express = require("express");
const { getQueries, postQuery } = require("../controllers/query");
const router = express.Router();

router.get("/", getQueries);

router.post("/", postQuery);

module.exports = router;

