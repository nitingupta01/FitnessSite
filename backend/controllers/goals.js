const UserInfo = require("../models/userinfo");


const getGoals = async (req, res) => {
  // const { token } = req.cookies;
  // if (!token) {
  //   return res.sendStatus(403);
  // }
  // const data = jwt.verify(token, secret);
  const id = req.id;
  try {
    const detail = await UserInfo.findOne({ id });
    res.status(200).json(detail.goals);
  } catch (e) {
    res.status(400).json(e);
  }
};

const addGoal = async (req, res) => {
  // const { token } = req.cookies;
  // if (!token) {
  //   return res.sendStatus(403);
  // }
  // const data = jwt.verify(token, secret);
  const id = req.id;
  let detail = await UserInfo.findOne({ id });
  const { goalName, goalDuration, goalDistance } = req.body;
  detail.goals.push({
    goalname: goalName,
    goalduration: goalDuration,
    goaldistance: goalDistance,
  });
  detail = await detail.save();
  res.status(200).json(detail.goals);
};

const deleteGoal = async (req, res) => {
  // const { token } = req.cookies;
  // if (!token) {
  //   return res.sendStatus(403);
  // }
  // const data = jwt.verify(token, secret);
  const id = req.id;
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
};

module.exports  =  {getGoals,addGoal,deleteGoal};