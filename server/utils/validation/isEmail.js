const emailRegex = /^[a-zA-Z0-9.!#$%&’*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;

const isEmail = email => {
  const isEmail = emailRegex.test(email);

  return isEmail;
};

module.exports = isEmail;
