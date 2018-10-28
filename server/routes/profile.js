// models
const User = require("../models/user");
// middleware
const isAuth = require("../middleware/isAuth");
// utils
const { serverRes, getErrMsg } = require("../utils/serverRes");

module.exports = app => {
  // get user profile
  app.get("/api/profile/:userId", isAuth, async (req, res) => {
    try {
      const { userId } = req.params;

      const profile = await User.findById(userId, {
        password: 0,
        role: 0,
        createdAt: 0,
        updatedAt: 0
      });

      serverRes(res, 200, null, { profile });
    } catch (err) {
      console.log("Err get profile", err);
      const msg = getErrMsg("err", "fetch", "profile");
      serverRes(res, 400, msg, null);
    }
  });
};
