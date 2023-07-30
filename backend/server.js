require('dotenv').config()
const express = require("express");
const mongoose = require("mongoose");
const User = require("./models/user");
const cors = require("cors");
const UserInfo = require("./models/userinfo");
const Query = require("./models/contact");
const ProductModel = require("./models/product");
const bcrypt=require('bcryptjs');
const jwt = require("jsonwebtoken");
const cookieParser = require("cookie-parser");
const app = express();
const secret = process.env.SECRET;
const salt = bcrypt.genSaltSync(10);


app.use(cors({ credentials: true, origin: "http://localhost:3000" }));
app.use(express.json());
app.use(cookieParser());
mongoose.connect(
  `mongodb+srv://nitingupta07:${process.env.PASSWORD}@cluster0.f71x7ga.mongodb.net/?retryWrites=true&w=majority`
);

// ---------------------------------------------------------------------------------------------------
// -------------------------------------------------LOGIN/REGISTER------------------------------------
// ---------------------------------------------------------------------------------------------------

app.post("/register", async (req, res) => {
  const { name, dob, contact, email, password } = req.body;
  try {
    const userDoc = await User.create({ email,password:bcrypt.hashSync(password,salt)});
    await UserInfo.create({ id: userDoc._id, email, name, dob, contact });
    res.json(userDoc);
  } catch (e) {
    res.status(400).json(e);
  }
});

app.post("/login", async (req, res) => {
  const { email, password } = req.body;
  const checkUser = await User.findOne({ email });
  if (checkUser == null) res.status(400).json("NOT A USER");
  else {
    const valid=bcrypt.compareSync(password,checkUser.password);
    if (valid) {
      const data = await UserInfo.findOne({ email });
      jwt.sign(
        { id: data.id, name: data.name, isAdmin: data.isAdmin },
        secret,
        {},
        (err, token) => {
          if (err) throw err;
          res
            .cookie("token", token)
            .json({ name: data.name, isAdmin: data.isAdmin });
        }
      );
    } else res.status(400).json("wrong credentials");
  }
});

app.get("/profile", (req, res) => {
  const { token } = req.cookies;
  if (token != "") {
    jwt.verify(token, secret, {}, (err, info) => {
      if (err) res.status(404).send();
      res.json(info);
    });
  } else {
    res.status(404).send();
  }
});

// -------------------------------------------------------------------------------------------------------
// --------------------------------------------------STATS-------------------------------------------------
// -------------------------------------------------------------------------------------------------------

app.get("/stats", async (req, res) => {
  const { token } = req.cookies;
  if (!token) {
    return res.sendStatus(403);
  }
  const data = jwt.verify(token, secret);
  const id = data.id;
  try {
    const detail = await UserInfo.findOne({ id });
    res
      .status(200)
      .json({
        duration: detail.duration,
        distance: detail.distance,
        calories: detail.calories,
        workout: detail.workout,
      });
  } catch (e) {
    res.status(400).json(e);
  }
});

app.put("/stats", async (req, res) => {
  const { token } = req.cookies;
  if (!token) {
    return res.sendStatus(403);
  }
  const { duration, distance, calories, workout } = req.body;
  const data = jwt.verify(token, secret);
  const id = data.id;
  try {
    const detail = await UserInfo.findOne({ id });
    await detail.updateOne({ duration, distance, calories, workout });
    res.json(detail);
  } catch (e) {
    res.status(400).json(e);
  }
});

// --------------------------------------------------------------------------------------------------
// --------------------------------------------GOALS-------------------------------------------------
// --------------------------------------------------------------------------------------------------

app.post("/goals", async (req, res) => {
  const { token } = req.cookies;
  if (!token) {
    return res.sendStatus(403);
  }
  const data = jwt.verify(token, secret);
  const id = data.id;
  let detail = await UserInfo.findOne({ id });
  const { goalName, goalDuration, goalDistance } = req.body;
  detail.goals.push({
    goalname: goalName,
    goalduration: goalDuration,
    goaldistance: goalDistance,
  });
  detail = await detail.save();
  res.status(200).json(detail.goals);
});

app.get("/getgoals", async (req, res) => {
  const { token } = req.cookies;
  if (!token) {
    return res.sendStatus(403);
  }
  const data = jwt.verify(token, secret);
  const id = data.id;
  try {
    const detail = await UserInfo.findOne({ id });
    res.status(200).json(detail.goals);
  } catch (e) {
    res.status(400).json(e);
  }
});

app.post("/deletegoal", async (req, res) => {
  const { token } = req.cookies;
  if (!token) {
    return res.sendStatus(403);
  }
  const data = jwt.verify(token, secret);
  const id = data.id;
  console.log("here");
  try {
    let detail = await UserInfo.findOne({ id });
    const { deleteid } = req.body;
    console.log(deleteid);
    detail.goals.remove({ _id: deleteid });
    await detail.save();
    detail = await UserInfo.findOne({ id });
    res.status(200).json(detail.goals);
  } catch (e) {
    res.status(400).json(e);
  }
});

// ----------------------------------------------------------------------------------------------------
// -----------------------------------------------CART-------------------------------------------------
// ----------------------------------------------------------------------------------------------------

app.post("/cart", async (req, res) => {
  const { token } = req.cookies;
  if (!token) {
    return res.sendStatus(403);
  }
  const data = jwt.verify(token, secret);
  const id = data.id;
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
});

app.get("/getcart", async (req, res) => {
  const { token } = req.cookies;
  if (!token) {
    return res.sendStatus(403);
  }
  const data = jwt.verify(token, secret);
  const id = data.id;
  try {
    const detail = await UserInfo.findOne({ id });
    res.status(200).json(detail.cart);
  } catch (e) {
    res.status(400).json(e);
  }
});

app.post("/deleteitem", async (req, res) => {
  const { token } = req.cookies;
  if (!token) {
    return res.sendStatus(403);
  }
  const data = jwt.verify(token, secret);
  const id = data.id;
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
});

// ------------------------------LOGOUT----------------------------------

app.post("/logout", (req, res) => {
  res.cookie("token", "").json("ok");
});

app.post("/query", async (req, res) => {
  const { name, email, query } = req.body;
  try {
    const queryDoc = await Query.create({ name, email, query });
    res.status(200).json(queryDoc);
  } catch (e) {
    res.status(400).json(e);
  }
});

app.get("/getquery", async (req, res) => {
  try {
    const queryDoc = await Query.find();
    res.status(200).json(queryDoc);
  } catch (e) {
    res.status(400).json(e);
  }
});



// ====================================================

app.post("/addproduct", async (req, res) => {
  const { prodname, prodimage, prodtype, prodduration, prodprice } = req.body;
  try {
    await ProductModel.create({
      prodname,
      prodimage,
      prodtype,
      prodduration,
      prodprice,
    });
    const ProdDoc = await ProductModel.find();
    res.status(200).json(ProdDoc);
  } catch (e) {
    res.json(400).json(e);
  }
});

app.post("/deleteproduct", async (req, res) => {
  const { deleteid } = req.body;
  try {
    await ProductModel.findOneAndRemove({ _id: deleteid });
    const ProdDoc = await ProductModel.find();
    res.status(200).json(ProdDoc);
  } catch (e) {
    res.status(400).json(e);
  }
});

app.get("/products", async (req, res) => {
  const ProdDoc = await ProductModel.find();
  res.status(200).json(ProdDoc);
});

app.get("/banner", async (req, res) => {
  const ProdDoc = await ProductModel.find().limit(4).skip(2);
  res.status(200).json(ProdDoc);
});

// ------------------------------LISTEN-------------------------------------

app.listen(process.env.PORT, () => {
  console.log(`Server is running on ${process.env.PORT}`);
});