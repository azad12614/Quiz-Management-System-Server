const mongoose = require('mongoose');

const questionSchema = new mongoose.Schema({
  text: String,
  options: [{ type: String }],
  answer: Number, // Index of the correct option in the options array
  explanation: String,
  media: { type: String, default: null }, // Optional media URL (e.g., image, audio)
  hint: String, // Optional hint for the question
  points:Number,
  userUid: String,
});

module.exports = mongoose.model('Question', questionSchema);