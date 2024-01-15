// const ENVIRONMENT = process.env.NODE_ENV;

// const connectToDb = () => {
//   if (ENVIRONMENT === "development") require("./mongoLocal");
//   if (ENVIRONMENT === "production") require("./mongoAtlas");
// };

// module.exports = connectToDb;

const mongoose = require("mongoose");
const ENVIRONMENT = process.env.NODE_ENV;

const connectToDb = () => {
  let dbConnectionString;

  if (ENVIRONMENT === "development") {
    dbConnectionString = require("./mongoLocal");
  } else if (ENVIRONMENT === "production") {
    dbConnectionString = require("./mongoAtlas");
  }

  return mongoose.connect(dbConnectionString, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  });
};

module.exports = connectToDb;
