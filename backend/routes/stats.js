const express = require('express');
const isAuthenticated = require('../middlewares/auth.js');
const { getStats, updateStats } = require('../controllers/stats.js');
const router = express.Router();


router.get("/", isAuthenticated , getStats);
  
router.put("/", isAuthenticated , updateStats);

module.exports = router;