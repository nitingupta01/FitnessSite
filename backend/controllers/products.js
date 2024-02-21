const ProductModel = require("../models/product");

const getProducts = async (req, res) => {
  const ProdDoc = await ProductModel.find();
  res.status(200).json(ProdDoc);
};

const addProduct = async (req, res) => {
  const { prodname, url, prodtype, prodduration, prodprice } = req.body;
  try {
    await ProductModel.create({
      prodname,
      prodimage: url,
      prodtype,
      prodduration,
      prodprice,
    });
    const ProdDoc = await ProductModel.find();
    res.status(200).json(ProdDoc);
  } catch (e) {
    console.log(e);
    res.json(400).json(e);
  }
};

const deleteProduct = async (req, res) => {
  const { deleteid } = req.body;
  try {
    await ProductModel.findOneAndRemove({ _id: deleteid });
    const ProdDoc = await ProductModel.find();
    res.status(200).json(ProdDoc);
  } catch (e) {
    res.status(400).json(e);
  }
};

module.exports = {getProducts,addProduct,deleteProduct};