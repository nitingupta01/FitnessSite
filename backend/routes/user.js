const express = require("express");
const router = express.Router();
const { login, logout, profile, register } = require('../controllers/user.js');


router.post("/register", register);

router.post("/login", login);  

router.get("/profile", profile);

router.post("/logout", logout);

module.exports = router;