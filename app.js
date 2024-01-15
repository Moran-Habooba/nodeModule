require("dotenv/config");
const mongoose = require("mongoose");
const connectToDb = require("./db/dbService");
const initialData = require("./initialData/initialData.json");
const {
  generateInitialCards,
  generateInitialUsers,
} = require("./initialData/initialDataService");

connectToDb();
// connectToDb().then(async () => {
//   await generateInitialUsers(initialData.users);
//   await generateInitialCards(initialData.cards);
// });
const express = require("express");
const morgan = require("morgan");

const app = express();

app.use(morgan("dev"));
app.use(express.json());
app.use(express.static("./public"));

app.use("/api/users", require("./routes/users.routes"));
app.use("/api/auth", require("./routes/auth.routes"));
app.use("/api/cards", require("./routes/cards.routes"));

app.use((req, res) => {
  res.status(404).send("Page Not Found");
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`listening on port ${PORT}`);
});
