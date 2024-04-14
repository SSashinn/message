const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
require('dotenv').config();

const PORT = 3000;
const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cors());

mongoose.set("strictQuery", false);
const mongoDB = process.env.MONGO_URL;
main().catch((err) => console.log(err));
async function main() {
  await mongoose.connect(mongoDB);
  console.log("Database succesfully connected");
};

const userRouter = require('./routes/user.route.js');
const friendRouter = require('./routes/friend.route.js');

app.use('/v1/api', userRouter);
app.use('/v1/api', friendRouter);

app.listen(PORT, () => {
  console.log(`Server is listening on port ${PORT}`);
});