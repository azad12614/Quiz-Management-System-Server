const Quiz = require('../models/QuizSchema'); // Assuming quiz.js is in models/quiz



// Create a new quiz
exports.createQuiz = async (req, res) => {
    const { title, quizId, quizPass, questions, difficulty, timeLimit, createdBy } = req.body;
    try {
      const newQuiz = new Quiz({ title, quizId, quizPass, questions, difficulty, timeLimit, createdBy });
      const savedQuiz = await newQuiz.save();
      res.status(201).json(savedQuiz);
    } catch (err) {
      res.status(400).json({ message: err.message }); // Handle validation errors or other issues
    }
  };



// Get all quizzes
exports.getAllQuizzes = async (req, res) => {
  try {
    const quizzes = await Quiz.find().populate('questions'); // Populate questions
    res.json(quizzes);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Get a specific quiz
exports.getQuizById = async (req, res) => {
  try {
    const quiz = await Quiz.findById(req.params.id).populate('questions');
    if (!quiz) return res.status(404).json({ message: 'Quiz not found' });
    res.json(quiz);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};



// // Update a quiz
// exports.updateQuiz = async (req, res) => {
//   const { title, quizId, quizPass, questions, difficulty, timeLimit, createdBy } = req.body;
//   try {
//     const updatedQuiz = await Quiz.findByIdAndUpdate(
//       req.params.id,