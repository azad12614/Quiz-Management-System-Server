const mongoose = require("mongoose");
const Question = require("./Question");

const quizSchema = new mongoose.Schema({
  title: String,
  // description: String,
  quizId: String,
  quizPass: String,
  questions: [{ type: mongoose.Schema.Types.ObjectId, ref: "Question" }],
  difficulty: String, // "Easy", "Medium", "Hard"
  timeLimit: Number,
  participantHistory: [
    {
      name: String,
      email: String,
      userUid: String,
      quizScore: Number,
      metricId:mongoose.Schema.Types.Mixed,
      quizScoreDetails: Object,
      completionTimestamp: Number,
      userResponses: [String],
      correctAnswer:[String],
    },
  ],
  CreateBy: { type: String, ref: "participant" },
  // CreateBy:{ type: String, ref: 'teacher' },
  createdAt: { type: Date, default: Date.now }, // Timestamp of quiz creation
});

module.exports = mongoose.model("Quiz", quizSchema);
