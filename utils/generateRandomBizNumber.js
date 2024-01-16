const _ = require("lodash");
const Card = require("../models/cards.model");

// function generateRandomBizNumber() {
//   return _.random(1000000, 9999999);
// }

async function generateRandomBizNumber() {
  while (true) {
    const randomNumber = _.random(100, 999_999_999_999);
    const card = await Card.findOne({ bizNumber: randomNumber });
    if (!card) {
      return String(randomNumber);
    }
  }
}

module.exports = { generateRandomBizNumber };
