const bcrypt = require("bcryptjs");
// models
const User = require("../models/user");
// middleware
const isAuth = require("../middleware/isAuth");
const isUser = require("../middleware/isUser");
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

  // update user profile
  app.patch("/api/profile/:userId", isAuth, isUser, async (req, res) => {
    try {
      const { userId } = req.params;
      const { profile } = req.body;

      const updatedProfile = await User.findByIdAndUpdate(
        userId,
        { $set: { ...profile } },
        { new: true }
      );

      const msg = "Profile has been updated";
      serverRes(res, 200, msg, { profile: updatedProfile });
    } catch (err) {
      console.log("Err update profile", err);
      const msg = getErrMsg("err", "update", "profile");
      serverRes(res, 400, msg, null);
    }
  });

  // update user password

  const hashPassword = password => {
    return new Promise((resolve, reject) => {
      bcrypt.genSalt(10, (err, salt) => {
        bcrypt.hash(password, salt, (err, hash) => {
          if (err) reject();
          resolve(hash);
        });
      });
    });
  };

  app.patch(
    "/api/profile/password/:userId",
    isAuth,
    isUser,
    async (req, res) => {
      try {
        const { userId } = req.params;
        const { password } = req.body;

        const hashedPassword = await hashPassword(password);

        await User.findByIdAndUpdate(userId, {
          $set: { password: hashedPassword }
        });

        const msg = "The password was updated";

        serverRes(res, 200, msg, null);
      } catch (err) {
        const msg = getErrMsg("err", "change", "password");
        serverRes(res, 401, msg, null);
      }
    }
  );
};
