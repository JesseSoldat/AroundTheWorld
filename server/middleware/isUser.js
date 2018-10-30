// utils
const { serverRes } = require("../utils/serverRes");

const isUser = (req, res, next) => {
  const currentUserId = req.user._id;
  const { userId } = req.params;

  if (currentUserId.toString() !== userId.toString()) {
    const msg = "Unauthorized Request";
    serverRes(res, 401, msg, null);
  }

  next();
};

module.exports = isUser;
