const express = require('express');
const router = express.Router();
const Participant = require('../models/Participant');
const Quiz = require('../models/QuizSchema'); // For adding quizzes to participants
const { createParticipant, getAllParticipants, getSpecificParticipants, addQuizToParticipant } = require('../controllers/participantController');

// app.use('/participants', participantRoutes);


// Create a participant
router.post('/', async (req, res) => {
  const { name, email,photo,password } = req.body;
  if (!name || !email) {
    return res.status(400).json({ message: 'Please provide name and email' });
  }
  try {
    const newParticipant = new Participant(req.body);
    const savedParticipant = await newParticipant.save();
    res.status(201).json(savedParticipant);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Get a specific participant
  router.get('/:userUid/quizId/:quizId', async(req, res) => {
  const { userUid, quizId } = req.params;

  const participant = await Participant.findOne({ userUid });
   console.log("userUId: "+userUid,)
   console.log("quizId : " + quizId)
  console.log(participant)
  if (!participant) {
    return res.status(404).json({ message: 'Participant not found in server' });
  }
  // Find participant history matching quizId and attemptId
  const history = participant.history.filter(
    entry => entry.quizId == quizId
  );
  console.log(history)
  console.log("historylength"+history.length)
  
  if (history.length === 0) {
    // If no history found, return 404 Not Found
    return res.status(404).json({ message: 'Participant history not found in server' });
  }
   const obj = {
    participant,
    history,
    
  }
   console.log(obj.history[0].userResponses)
  // Return the participant history
  res.json(obj);
})



// Get all participants
router.get('/', getAllParticipants);



// Get a specific participant
router.get('/:id',getSpecificParticipants);

// Add a quiz to a participant (assuming a relationship exists)



// Route to submit quiz attempt (update participant's history)
router.post('/:id/attempts', async (req, res) => {
    const { participantId } = req.params;
    const { quizId, score, completedAt } = req.body;
     console.log(completedAt )
     console.log(req.body)
    try {
      const participant = await Participant.findByIdAndUpdate(
        participantId,
        {
          $push: {
            history: { quiz: quizId, score, completedAt },
          },
        },
        { new: true } // Return the updated participant object
      );
      if (!participant) {
        return res.status(404).json({ message: 'Participant not found' });
      }
      res.json(participant);
    } catch (err) {
      console.error('Error submitting quiz attempt:', err);
      res.status(500).json({ message: 'Error submitting quiz attempt' });
    }
  });

// (Add other participant routes like update, delete)

module.exports = router;
