const UserInfo = require("../models/userinfo");

const getStats = async (req, res) => {
    // const { token } = req.cookies;
    // if (!token) {
    //   return res.sendStatus(403);
    // }
    // const data = jwt.verify(token, secret);
    const id = req.id;
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
};

const updateStats = async (req, res) => {
    // const { token } = req.cookies;
    // if (!token) {
    //   return res.sendStatus(403);
    // }
    // const { duration, distance, calories, workout } = req.body;
    // const data = jwt.verify(token, secret);
    const id = req.id;
    try {
      const detail = await UserInfo.findOne({ id });
      await detail.updateOne({ duration, distance, calories, workout });
      res.json(detail);
    } catch (e) {
      res.status(400).json(e);
    }
}

module.exports = {getStats ,updateStats};