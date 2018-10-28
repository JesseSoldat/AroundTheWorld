// Models
const User = require("../models/user");
// Utils
const { serverRes } = require("../utils/serverRes");

const handleErrMsg = (res, type) => {
  const errs = {
    auth: "An error ocurred while authenticating. ",
    noToken: "A token was not sent with the request. ",
    noUser: "Could not find a user matching the token. "
  };
  const msg = errs[type] + " Please login again.";

  serverRes(res, 400, msg, null, { tokenErr: true });
};

const isAuth = async (req, res, next) => {
  const token = req.header("Authorization");

  try {
    if (!token) return handleErrMsg(res, "noToken");

    // returns User || null
    const user = await User.findByToken(token);

    if (!user) return handleErrMsg(res, "noUser");

    req.user = user;
    req.token = token;

    next();
  } catch (err) {
    console.log("Err: isAuth Middleware", err);
    handleErrMsg(res, "noUser");
  }
};

module.exports = isAuth;
