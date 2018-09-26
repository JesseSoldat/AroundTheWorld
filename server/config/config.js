const env = process.env.NODE_ENV || "dev";

if (env === "dev") {
  const config = require("./config.json");
  const envConfig = config[env];

  Object.keys(envConfig).forEach(key => (process.env[key] = envConfig[key]));
}
