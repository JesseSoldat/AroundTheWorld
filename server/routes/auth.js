// Models
const User = require("../models/user");
// Middleware
const authCheckForm = require("../middleware/authCheckForm");
// Utils
const { serverRes, getMsg, getErrMsg } = require("../utils/serverRes");

module.exports = app => {
  // Register
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
      const msg = getErrMsg("error", "register", "user");
      serverRes(res, 400, msg, null);
    }
  });

  // Login
  app.post("/api/login", async (req, res) => {});

  // Logout
  app.delete("/api/logout", async (req, res) => {});

  // Reset Password
  app.patch("/api/resetPasswordEmail", async (req, res) => {});

  app.patch("/api/resetPassword", async (req, res) => {});
};
