const Question = require("../models/Question");


exports.createQuestion = async (req, res) => {
    const { text, options, answer } = req.body;
    if (!text || !options || !answer) {
      return res.status(400).json({ message: 'Please provide all required fields' });
    }
    if (answer < 0 || answer >= options.length) {
      return res.status(400).json({ message: 'Invalid answer index' });
    }
    try {
      const newQuestion = new Question({ text, options, answer });
      const savedQuestion = await newQuestion.save();
      res.status(202).json(savedQuestion);
    } catch (err) {
      res.status(500).json({ message: err.message });
    }
  }