const mongoose = require("mongoose");

// const dbURL = "mongodb://localhost:27017/storage";

const connectDB = async (dbURL) => {
  try {
    await mongoose.connect(dbURL);
    console.log("mongodb atlas is connected");
 
  }
  catch (error) {
    console.log("Database connection is Failed");
    console.log(error.message);
    process.exit(1);
  }

};

module.exports = connectDB;
