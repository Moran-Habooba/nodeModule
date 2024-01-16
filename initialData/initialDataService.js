const { users, cards } = require("./initialData.json");
const { User } = require("../models/users.model");
const { Card } = require("../models/cards.model");
// const generateRandomBizNumber = require("../utils/generateRandomBizNumber");
const _ = require("lodash");

if (require.main === module) {
  const args = {
    fullReset: ["--full-reset", "-fr"].includes(process.argv[2]),
  };

  require("../configs/loadEnvs");

  require("../db/dbService")
    .connect()
    .then(() => seed({ fullReset: args.fullReset }));
}

// async function seed({ fullReset = false } = {}) {
//   if (fullReset) {
//     await Promise.all([User.deleteMany({}), Card.deleteMany({})]);
//   }

//   await generateUsers().then((users) =>
//     Promise.all(users.map((user) => generateCards(user._id)))
//   );

//   console.log("seeded");
// }

// async function generateUsers() {
//   const Ps = [];
//   for (const user of users) {
//     Ps.push(new User(user).save());
//   }

//   return await Promise.all(Ps);
// }

// async function generateCards(user_id) {
//   const Ps = [];
//   for (const card of cards) {
//     Ps.push(new Card({ ...card, user_id }));
//   }

//   return await Promise.all(Ps);
// }

async function seed({ fullReset = false } = {}) {
  if (fullReset) {
    await Promise.all([User.deleteMany({}), Card.deleteMany({})]);
  }

  const createdUsers = await generateUsers();

  const firstBusinessUser = createdUsers.find((user) => user.isBusiness);

  if (firstBusinessUser) {
    await generateCards(firstBusinessUser._id);
  }

  console.log("seeded");
}

async function generateUsers() {
  const Ps = [];
  for (const user of users) {
    const newUser = await new User(user).save();
    Ps.push(newUser);
  }

  return await Promise.all(Ps);
}
async function generateCards(user_id) {
  const Ps = [];
  for (const card of cards) {
    const newCard = await new Card(card).save();
    newCard.user_id = user_id;
    Ps.push(newCard);
  }

  return await Promise.all(Ps);
}

module.exports = { seed };
