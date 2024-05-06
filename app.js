const express = require('express')
const app = express()
const cors = require("cors")
const quizRoutes = require("./routes/quizRoutes")
const questionRoutes = require("./routes/questionRoutes")
const participantRoutes = require("./routes/participantRoute")



app.use(express.json());
app.use(cors());
app.use(express.urlencoded({extended:true}));

// Routes
app.use('/quizzes', quizRoutes);
app.use('/questions', questionRoutes);
app.use('/participants', participantRoutes);

app.get('/' , (req , res)=>{
   res.send('hello from simple server')
})

module.exports =app;

