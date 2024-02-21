const UserInfo = require("../models/userinfo");

const getCart = async (req, res) => {
//   const { token } = req.cookies;
//   if (!token) {
//     return res.sendStatus(403);
//   }
//   const data = jwt.verify(token, secret);
  const id = req.id;
  try {
    const detail = await UserInfo.findOne({ id });
    res.status(200).json(detail.cart);
  } catch (e) {
    res.status(400).json(e);
  }
};

const addToCart = async (req, res) => {
//   const { token } = req.cookies;
//   if (!token) {
//     return res.sendStatus(403);
//   }
//   const data = jwt.verify(token, secret);
  const id = req.id;
  const detail = await UserInfo.findOne({ id });
  const { product_id, name, type, count, price } = req.body;

  const index = detail.cart.findIndex((p) => p.product_id == product_id);
  if (index > -1) {
    const item = detail.cart[index];
    item.count = item.count + count;
    detail.cart[index] = item;
  } else {
    detail.cart.push({
      product_id: product_id,
      name: name,
      count: count,
      type: type,
      price: price,
    });
  }
  await detail.save();
};

const deleteFromCart = async (req, res) => {
//   const { token } = req.cookies;
//   if (!token) {
//     return res.sendStatus(403);
//   }
//   const data = jwt.verify(token, secret);
  const id = req.id;
  try {
    let detail = await UserInfo.findOne({ id });
    const { deleteid } = req.body;
    detail.cart.remove({ product_id: deleteid });
    await detail.save();
    detail = await UserInfo.findOne({ id });
    res.status(200).json(detail.cart);
  } catch (e) {
    res.status(400).json(e);
  }
};

module.exports = {getCart,addToCart,deleteFromCart};
