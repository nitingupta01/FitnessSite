const express = require("express");
const { getProducts, addProduct, deleteProduct } = require("../controllers/products");
const router = express.Router();

router.get("/", getProducts);

router.post("/add", addProduct);

router.post("/delete", deleteProduct);

module.exports = router;
