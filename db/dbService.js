const { mongo } = require("../configs/config");
const mongoose = require("mongoose");

async function connect() {
  const uri = `${mongo.uri}${mongo.uri.at(-1) === "/" ? "" : "/"}${
    mongo.dbName
  }`;

  console.log(`connecting to db: ${uri}`);

  return mongoose
    .connect(uri)
    .then(() => console.log("connected to db"))
    .catch((err) => console.log("could not connect to db", err.message));
}

module.exports = { connect };
