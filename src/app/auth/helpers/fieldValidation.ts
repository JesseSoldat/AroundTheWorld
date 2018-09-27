const getErrMsg = (key, length) => {
  const errMsgs = {
    required: "This field is required!",
    minlength: `This field has to be at least ${length} characters long!`,
    maxlength: `This field can not be over ${length} characters!`,
    email: "Please enter a valid email!",
    nomatch: "The passwords do not match!"
  };
  return errMsgs[key];
};

const handleMinMaxLength = (errObj, key) => {
  if (key === "minlength") {
    const min = errObj[key].requiredLength;
    return getErrMsg(key, min);
  } else if (key === "maxlength") {
    const max = errObj[key].requiredLength;
    return getErrMsg(key, max);
  }
};

export const fieldValidation = errObj => {
  if (errObj === null) return;

  const errKeys = ["required", "nomatch", "minlength", "maxlength", "email"];
  let msg = null;

  errKeys.forEach(key => {
    if (errObj[key]) {
      if (key === "minlength" || key === "maxlength") {
        return (msg = handleMinMaxLength(errObj, key));
      }

      return (msg = getErrMsg(key, null));
    }
  });
  return msg;
};
