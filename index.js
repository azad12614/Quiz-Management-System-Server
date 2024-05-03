const app = require("./app");
const connectDB = require("./config/db");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
require("dotenv").config();







// todoSchema.query = {
//     byLanguage: function (language){
//         return this.find({title:new regExp(language,"i")});//new RegExp
//        res.status(200).json({
//         data,
//        })
//     }
// }

const port = process.env.PORT || 3000;
 app.listen( port, ()=> {
   const dbURL = "mongodb://localhost:27017/QuizManagement";
   console.log(`Server is up and running on http://localhost:${port}`)
   connectDB(dbURL)
});
