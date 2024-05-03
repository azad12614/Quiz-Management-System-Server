const Participant = require("../models/Participant");


exports.createParticipant = async (req, res) => {
    const { name, email } = req.body;
    if (!name || !email) {
      return res.status(400).json({ message: 'Please provide name and email' });
    }
    try {
      const newParticipant = new Participant({ name, email });
      const savedParticipant = await newParticipant.save();
      res.status(201).json(savedParticipant);
    } catch (err) {
      res.status(500).json({ message: err.message });
    }
  }


  exports.getAllParticipants = async (req, res) => {
    try {
      const participants = await Participant.find().populate('quizzes');
      res.json(participants);
    } catch (err) {
      res.status(500).json({ message: err.message });
    }
  }
  
  exports.getSpecificParticipants = async (req, res) => {
    try {
      const participant = await Participant.findById(req.params.id).populate('quizzes');
      if (!participant) return res.status(404).json({ message: 'Participant not found' });
      res.json(participant);
    } catch (err) {
      res.status(500).json({ message: err.message });
    }
  }
 
  exports.addQuizToParticipant = async (req, res) => {
    const { participantId, quizId } = req.params;
    try {
      const participant = await Participant.findById(participantId);
      const quiz = await Quiz.findById(quizId);
      if (!participant || !quiz) {
        return res.status(404).json({ message: 'Participant or quiz not found' });
      }
      participant.quizzes.push(quiz);
      await participant.save();
      res.json({ message: 'Quiz added to participant' });
    } catch (err) {
      res.status(500).json({ message: err.message });
    }
  }