const jwt = require("jsonwebtoken");
const secret = process.env.SECRET;


const isAuthenticated = (req,res,next)=>{
  const { token } = req.cookies;
  if (!token) {
    return res.sendStatus(403);
  }
  const data = jwt.verify(token, secret);
  const id = data.id;
  req.id=id;
  next();
};

module.exports = isAuthenticated;