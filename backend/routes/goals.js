const express = require('express');
const isAuthenticated = require('../middlewares/auth');
const { getGoals, addGoal ,deleteGoal} = require('../controllers/goals');
const router = express.Router();


router.get("/", isAuthenticated , getGoals);

router.post("/new", isAuthenticated , addGoal);
  
router.post("/delete", isAuthenticated , deleteGoal);

module.exports = router;