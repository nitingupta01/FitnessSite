const express = require("express");
const { getCart, addToCart, deleteFromCart } = require("../controllers/cart");
const isAuthenticated = require("../middlewares/auth");
const router = express.Router();


router.get("/", isAuthenticated , getCart);

router.post("/add", isAuthenticated , addToCart);

router.post("/remove", isAuthenticated, deleteFromCart);

module.exports = router;
