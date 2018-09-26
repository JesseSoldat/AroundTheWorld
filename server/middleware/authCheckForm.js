// Utils
const { serverRes, getErrMsg } = require("../utils/serverRes");
const isEmail = require("../utils/validation/isEmail");

const authenticationCheck = async (req, res, next) => {
  const { username, email, password } = req.body;

  req.locals = { msg: "authenticationCheck says hello!" };

  // Register Only Check for Username
  if (req.url === "/api/register") {
    if (!username) {
      const msg = getErrMsg("allFields");
      return serverRes(res, 401, msg, null);
    }
  }

  // Check for Email and Password
  if (!email || !password) {
    const msg = getErrMsg("allFields");
    return serverRes(res, 401, msg, null);
  }

  // Check for Valid Email
  if (!isEmail(email)) {
    const msg = getErrMsg("isEmail");
    return serverRes(res, 401, msg, null);
  }

  // Check the Password Length
  if (password.length < 6) {
    const msg = getErrMsg("passwordLength");
    return serverRes(res, 400, msg, null);
  }

  // Continue with next Middleware or Route Handler
  next();
};

module.exports = authenticationCheck;
