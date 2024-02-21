const Query = require("../models/contact");

const getQueries = async (req, res) => {
  try {
    const queryDoc = await Query.find();
    res.status(200).json(queryDoc);
  } catch (e) {
    res.status(400).json(e);
  }
};

const postQuery = async (req, res) => {
  const { name, email, query } = req.body;
  try {
    const queryDoc = await Query.create({ name, email, query });
    res.status(200).json(queryDoc);
  } catch (e) {
    res.status(400).json(e);
  }
};


module.exports = {getQueries , postQuery};