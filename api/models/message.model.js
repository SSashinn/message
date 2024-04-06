const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const MessageSchema = new Schema({
  body: {type: String, required: true},
  author: {type: Schema.Types.ObjectId, ref:"User", required: true},
  time: {type: Date,default: Date.now() ,required: true},
  dm: {type: Schema.Types.ObjectId, ref: "DM", required: true},
});

module.exports = mongoose.model("Message", MessageSchema);