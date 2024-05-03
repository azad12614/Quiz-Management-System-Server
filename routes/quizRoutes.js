const express = require("express");
const Quiz = require("../models/QuizSchema");
const Participant = require("../models/Participant");
const router = express.Router();

// app.use('/quizzes', quizRoutes);

// Create a new quiz
router.post("/", async (req, res) => {
  const { title, description, questions, userId, ...otherData } = req.body;
  console.log(req.body.userUid);
  console.log(userId);

  try {
    const newQuiz = new Quiz(req.body);
    console.log("object");
    console.log(newQuiz);
    const savedQuiz = await newQuiz.save();
    res.status(201).json(savedQuiz);
  } catch (err) {
    res.status(400).json({ message: err.message }); // Handle validation errors or other issues
  }
});

// Create a new quiz with add question
router.put("new quiz/:id", async (req, res) => {
  console.log("put");
  const { questions} = req.body;
  try {
    const updatedQuiz = await Quiz.findByIdAndUpdate(
      req.params.id,
      { $push: { questions: req.body } },
      { new: true } // Return the updated document
    );
    if (!updatedQuiz)
      return res.status(404).json({ message: "Quiz not found" });
    res.json(updatedQuiz,'saved question succesfully');
    console.log("update"+updatedQuiz._id)
    console.log("success")
  } catch (err) {
    res.status(400).json({ message: err.message }); // Handle validation errors or other issues
  }
});

// Get all quizzes
router.get("/userUid/:userUid", async (req, res) => {
 
  try {

     const userUid=(req.params.userUid)
    const quizzes = await Quiz.find({CreateBy: userUid}).populate("questions");
    // .populate("user","name username -_id")
    console.log(quizzes)
    res.json(quizzes);
  } catch (err) {
    console.log(err)
    res.status(500).json({ message: err.message });
  }
});






// DELETE route to remove a participant from quiz participant history
router.delete('/:quizId/participant/:participantId', async (req, res) => {
  const quizId = req.params.quizId;
  const participantId = req.params.participantId;
  try {    // Find the quiz by ID and update the participantHistory array to remove the participant
    const updatedQuiz = await Quiz.findOneAndUpdate(
      { _id: quizId },
      { $pull: { participantHistory: { userUid : participantId } } },
      { new: true }
    );

    if (!updatedQuiz) {
      return res.status(404).json({ message: 'Quiz not found' });
    }

    res.status(200).json({ message: 'Participant removed successfully', updatedQuiz });
    console.log('Participant removed successfully')
  } catch (error) {
    console.error('Error removing participant:', error);
  
  res.status(500).json({ message: 'Internal server error' });
  }
});



// Get a specific quiz 
router.get("/:id", async (req, res) => {
  try {
    const quiz = await Quiz.findById(req.params.id).populate("questions"); // Populate questions
    if (!quiz) return res.status(404).json({ message: "Quiz not found" });
  //  console.log(quiz)
    res.json(quiz);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});



// Update a quiz  to push participant history both participant and quizzes
router.put("/:id", async (req, res) => {
  console.log("put");
  console.log(req.body)
 ;

  const  userUid = req.body.userUid;
  console.log(userUid)
  
  try {
    const updatedParticipantHistory = await Participant.findOneAndUpdate(
      {userUid},
      { $push: { history: req.body} },
      { new: true } // Return the updated document
    );

    console.log((updatedParticipantHistory))
    const updatedQuiz = await Quiz.findByIdAndUpdate(
      req.params.id,
      { $push: { participantHistory: req.body } },
      { new: true } // Return the updated document
    );
    
    if (!updatedQuiz)
      return res.status(404).json({ message: "Quiz not found" });
    console.log(updatedQuiz._id)

      res.json({updatedQuiz,id:updatedQuiz._id}); 
    console.log("success")
  } catch (err) {
    console.log("update failed")
    res.status(400).json({ message: err.message }); // Handle validation errors or other issues
  }
});

// Delete a quiz
router.delete("/:id", async (req, res) => {
  console.log(req.params.id)
  try {
    const deletedQuiz = await Quiz.findByIdAndDelete(req.params.id);
    if (!deletedQuiz)
      return res.status(404).json({ message: "Quiz not found" });
    res.json({ message: "Quiz deleted successfully" });
  } catch (err) {
    res.status(500).json({ message: err.message }); // Handle database errors
  }
});

// (Add other question routes like get all, get specific, update, delete)

module.exports = router;
