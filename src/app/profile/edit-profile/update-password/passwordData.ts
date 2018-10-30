export default {
  password: {
    name: "password",
    type: "password",
    label: "* Password",
    placeholder: "Enter a password",
    info: "Make sure it is a least 6 characters long.",
    err: "passwordErr",
    required: true
  },
  confirmPassword: {
    name: "confirmPassword",
    type: "password",
    label: "* Confirm Password",
    placeholder: "Enter a password",
    info: "Make sure your password is the same as above!",
    err: "confirmPasswordErr",
    required: false
  }
};
