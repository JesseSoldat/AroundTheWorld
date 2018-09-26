const getErrMsg = (type, method, target, code) => {
  const msgTypes = {
    err: `An error ocurred while trying to ${method} the ${target}.`,
    allFields: "All form fields must be filled in.",
    isEmail: "The email address you have entered is not a valid email.",
    passwordLength: "The password must be at least 6 characters long.",
    haveUser: "The email address you entered is already in use.",
    noUser: "No user for this email and password."
  };

  return { info: msgTypes[type], color: "red", code };
};

const getMsg = (type, method, target, code) => {
  const msgTypes = {
    info: `An error ocurred while trying to ${method} the ${target}.`
  };

  return { info: msgTypes[type], color: "blue", code };
};

const serverRes = (res, status, msg = null, payload = null) => {
  res.status(status).send({ msg, payload });
};

module.exports = { getErrMsg, getMsg, serverRes };
