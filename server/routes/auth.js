// Models
const User = require("../models/user");
const AuthToken = require("../models/authToken");
// Middleware
const authCheckForm = require("../middleware/authCheckForm");
const isAuth = require("../middleware/isAuth");
// Utils
const { serverRes, getMsg, getErrMsg } = require("../utils/serverRes");

module.exports = app => {
  // --------------------- Register -----------------------------
  app.post("/api/register", authCheckForm, async (req, res) => {
    const { username, email, password } = req.body;
    // console.log(req.locals);

    try {
      const haveUser = await User.findOne({ email });

      if (haveUser) {
        const msg = getErrMsg("haveUser");
        return serverRes(res, 400, msg, null);
      }

      const user = new User({ username, email, password });

      user["role"] = "user";

      await user.save();

      const { token, err } = await user.generateAuthToken();

      // err: false unless set in catch block
      if (err) {
        const msg = getMsg(err);
        return serverRes(res, 400, msg, null);
      }

      const msg = getMsg(`${user.email} is now registered.`, "blue");

      serverRes(res, 200, msg, { token });
    } catch (err) {
      console.log("Err: Register", err);
      const msg = getErrMsg("err", "register", "user");
      serverRes(res, 400, msg, null);
    }
  });

  // --------------------- Login -----------------------------
  app.post("/api/login", authCheckForm, async (req, res) => {
    const { email, password } = req.body;

    try {
      // returns User or null
      const user = await User.findByCredentials(email, password);

      if (!user) {
        const msg = getErrMsg("noUser");
        return serverRes(res, 400, msg, null);
      }

      const { token, err } = await user.generateAuthToken();

      // err: false unless set in catch block
      if (err) {
        const msg = getMsg(err);
        return serverRes(res, 400, msg, null);
      }

      const msg = getMsg(`${user.email} has logged in successfully.`, "blue");

      serverRes(res, 200, msg, { token });
    } catch (err) {
      console.log("Err: Login", err);
      const msg = getErrMsg("err", "login", "user");
      serverRes(res, 400, msg, null);
    }
  });

  // Logout
  app.delete("/api/logout", isAuth, async (req, res) => {
    const { token, user } = req;

    try {
      await AuthToken.findOneAndUpdate(
        { tokens: token },
        { $pull: { tokens: token } }
      );

      const msg = getMsg(`${user.email} is now logged out.`, "blue");

      serverRes(res, 200, msg, null);
    } catch (err) {
      console.log("Err: Logout", err);
      const msg = getErrMsg("err", "logout", "user");
    }
  });

  // Reset Password
  app.patch("/api/resetPasswordEmail", async (req, res) => {});

  app.patch("/api/resetPassword", async (req, res) => {});
};
