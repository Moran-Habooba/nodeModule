const path = require("node:path");

const envPath = path.resolve(__dirname, `../${`.env.${process.env.NODE_ENV}`}`);

console.log("loading environment variables from: ", envPath);

require("dotenv").config({
  path: envPath,
});
