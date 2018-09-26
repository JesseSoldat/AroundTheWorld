// utils
const { serverRes, getErrMsg } = require("../utils/serverRes");
const isEmail = require("../utils/validation/isEmail");

const authCheckForm = (req, res, next) => {
  const { username, email, password } = req.body;

  //console.log(req.url);

  if (req.url === "/api/register") {
    if (!username) {
      const msg = getErrMsg("allFields");
      return serverRes(res, 401, msg, null);
    }
  }

  if (!email || !password) {
    const msg = getErrMsg("allFields");
    return serverRes(res, 401, msg, null);
  }

  if (!isEmail(email)) {
    const msg = getErrMsg("isEmail");
    return serverRes(res, 401, msg, null);
  }

  if (password.length < 6) {
    const msg = getErrMsg("passwordLength");
    return serverRes(res, 400, msg, null);
  }

  next();
};

module.exports = authCheckForm;
