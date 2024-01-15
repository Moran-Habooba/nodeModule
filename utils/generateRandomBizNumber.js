const _ = require("lodash");

function generateRandomBizNumber() {
  return _.random(1000000, 9999999);
}

module.exports = { generateRandomBizNumber };
