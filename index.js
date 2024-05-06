const app = require("./app");
const connectDB = require("./config/db");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
require("dotenv").config();



const port = process.env.PORT || 3000;

 app.listen( port, ()=> {
  //  const dbURL = process.env.DB_URL|| "mongodb://localhost:27017/QuizManagement";
   const dbURL = `mongodb+srv://Adnan:LPL1MheB0B4bsCvg@cluster0.mpobb6h.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0`;

   console.log(`Server is up and running on http://localhost:${port}`)
   connectDB(dbURL)
});
