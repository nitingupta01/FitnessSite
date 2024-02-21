const User = require("../models/user.js");
const UserInfo = require("../models/userinfo.js");
const bcrypt = require("bcryptjs");
const salt = bcrypt.genSaltSync(10);
const jwt = require("jsonwebtoken");
const secret = process.env.SECRET;

const register = async (req, res) => {
  const { name, dob, contact, email, password } = req.body;
  try {
    const userDoc = await User.create({
      email,
      password: bcrypt.hashSync(password, salt),
    });
    await UserInfo.create({ id: userDoc._id, email, name, dob, contact });
    res.json(userDoc);
  } catch (e) {
    res.status(400).json(e);
  }
};

const login = async (req, res) => {
  const { email, password } = req.body;
  const checkUser = await User.findOne({ email });
  if (checkUser == null) res.status(400).json("NOT A USER");
  else {
    const valid = bcrypt.compareSync(password, checkUser.password);
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
};

const profile = (req, res) => {
  const { token } = req.cookies;
  if (token != "") {
    jwt.verify(token, secret, {}, (err, info) => {
      if (err) res.status(404).send();
      res.json(info);
    });
  } else {
    res.status(404).send();
  }
};

const logout = (req, res) => {
  res.cookie("token", "").json("ok");
};

module.exports = { login, register, profile, logout };
