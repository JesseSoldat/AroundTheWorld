const decodeToken = token => JSON.parse(window.atob(token.split(".")[1]));

export { decodeToken };
