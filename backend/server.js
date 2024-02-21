require("dotenv").config();

const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const cookieParser = require("cookie-parser");
const app = express();

const userRoutes = require("./routes/user.js");
const statRoutes = require("./routes/stats.js");
const goalRoutes = require("./routes/goals.js");
const productRoutes = require("./routes/products.js");
const cartRoutes = require("./routes/cart.js");
const queryRoutes = require("./routes/query.js");

app.use(cors({ credentials: true, origin: "http://localhost:3000" }));
app.use(express.json());
app.use(cookieParser());

mongoose
  .connect(
    `mongodb+srv://nitingupta07:${process.env.PASSWORD}@cluster0.f71x7ga.mongodb.net/?retryWrites=true&w=majority`
  )
  .then(console.log("Connected to Mongo"))
  .catch((err) => console.log(err));

app.use("/users", userRoutes);
app.use("/stats", statRoutes);
app.use("/goals", goalRoutes);
app.use("/products", productRoutes);
app.use("/cart", cartRoutes);
app.use("/query", queryRoutes);

app.listen(process.env.PORT, () => {
  console.log(`Server is running on ${process.env.PORT}`);
});
