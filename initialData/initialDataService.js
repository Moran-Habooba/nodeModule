const { default: mongoose } = require("mongoose");
const { users, cards } = require("./initialData.json");

require("../db/dbService")().then(init);

function init() {
  //   console.log(mongoose.connection);
}

// const mongoose = require("mongoose");
// const User = require("../models/users.model");
// const Card = require("../models/cards.model");
// const initialData = require("./initialData.json");

// async function generateInitialUsers(usersData) {
//   for (const user of usersData) {
//     const existingUser = await User.findOne({ email: user.email });
//     if (!existingUser) {
//       const newUser = new User(user);
//       await newUser.save();
//     }
//   }
// }

// async function generateInitialCards(cardsData) {
//   const businessUsers = await User.find({ isBusiness: true });

//   for (const card of cardsData) {
//     const existingCard = await Card.findOne({ bizNumber: card.bizNumber });
//     if (!existingCard) {
//       const user = businessUsers.find((u) => u.email === card.userEmail);
//       if (user) {
//         const newCard = new Card({ ...card, user_id: user._id });
//         await newCard.save();
//       }
//     }
//   }
// }

// module.exports = {
//   generateInitialCards,
//   generateInitialUsers,
// };
