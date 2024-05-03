const express = require('express');
const Question = require('../models/Question'); // Assuming a Question model
const router = express.Router();




// app.use('/questions', questionRoutes);

// Create a new question

router.post('/', async (req, res) => {
  const { text, options, answer, explanation, points, media, hint,userUid } = req.body;
  try {
    const newQuestion = new Question({ text, options, answer, explanation, points, media, hint,userUid });
    const savedQuestion = await newQuestion.save();
    const {id} = savedQuestion
    res.status(201).json({savedQuestion,id});
  } catch (err) {
    res.status(400).json({ message: err.message }); // Handle validation errors or other issues
  }
});

//post method - insert many questions
router.post('/all', async (req, res) => {
  
  
  try {
    // Validate and sanitize questions if necessary (see previous response)
    const savedQuestions = await  Question.insertMany(req.body);
    // console.log(req.body)
      // console.log(savedQuestions)
    if (!savedQuestions) {
      return res.status(500).json({ message: 'Error saving questions to database' });
    }
    const questionIds = savedQuestions.map(question => question._id);
    res.status(201).json({ message: 'Questions saved successfully',questionIds});
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Internal server error' });
  }
});



// Get all questions
router.get('/', async (req, res) => {
  try {
    const questions = await Question.find();
    res.json(questions);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Get a specific question
router.get('/:id', async (req, res) => {
  try {
    const question = await Question.findById(req.params.id);
    if (!question) return res.status(404).json({ message: 'Question not found' });
    res.json(question);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});


// Update a question
router.put('/:id', async (req, res) => {
  const { text, options, answer, explanation, points, media, hint,userUid } = req.body;
  try {
    const updatedQuestion = await Question.findByIdAndUpdate(
     { _id:req.params.id},
      { $set: { text, options, answer, explanation, points, media, hint } },
      { new: true } // Return the updated document
    );
    console.log(updatedQuestion)
    // res.status(201).json({updatedQuestion});
    if (!updatedQuestion) return res.status(404).json({ message: 'Question not found' });
    res.json(updatedQuestion);
  } catch (err) {
    res.status(400).json({ message: err.message }); // Handle validation errors or other issues
  }
});

// Delete a question
router.delete('/:id', async (req, res) => {
  try {
    const deletedQuestion = await Question.findByIdAndDelete(req.params.id);
    if (!deletedQuestion) return res.status(404).json({ message: 'Question not found' });
    res.json({ message: 'Question deleted successfully' });
  } catch (err) {
    res.status(500).json({ message: err.message }); // Handle database errors
  }
});

module.exports = router;
