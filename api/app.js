const express = require('express');
const mongoose = require('mongoose');
require('dotenv').config();

const PORT = 3000;
const app = express();

mongoose.set("strictQuery", false);
const mongoDB = process.env.MONGO_URL;
main().catch((err) => console.log(err));
async function main() {
  await mongoose.connect(mongoDB);
  console.log("Database succesfully connected");
};

app.listen(PORT, () => {
  console.log(`Server is listening on port ${PORT}`);
});