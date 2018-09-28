import { decodeToken } from "./decodeToken";

const checkTokenExpiration = token => {
  let tokenIsExpired = false;
  const decodedToken = decodeToken(token);

  const { exp } = decodedToken;
  const now = new Date().getTime();

  // console.log("now", now);
  // console.log("expires", exp);

  if (exp < now) tokenIsExpired = true;

  return tokenIsExpired;
};

export { checkTokenExpiration };
