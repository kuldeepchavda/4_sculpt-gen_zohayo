const mongoose = require("mongoose")
const User = require("../model/Users");
async function generateUsername(email) {
  if (!email || typeof email !== "string") {
    throw new Error("Invalid email address");
  } 
  let username = email.split("@")[0];  

  // Check for existing username and generate a new one if necessary
  let uniqueUsername = await findUniqueUsername(username);
  return uniqueUsername;
}

async function findUniqueUsername(username, suffix = "") {
  const newUsername = username + suffix;

  const user = await User.findOne({ username: newUsername });

  if (!user) {
    return newUsername;
  }
  const newSuffix = suffix ? parseInt(suffix) + 1 : 1;
  return await findUniqueUsername(username, newSuffix.toString());
}


module.exports = generateUsername;







// requirements

// const express = require("express")
// const dotenv = require("dotenv")
// dotenv.config()
// const app = express()
// mongoose.connect(process.env.MONGO_URI).then((res)=>{console.log("connected")})

// at bottom

// (async () => {
//   try {
//     const email = "kuldeepchavda@domain.com";
//     const username = await generateUsername(email);
//     console.log(username); 
//   } catch (error) {
//     console.error(error.message);
//   }
// })();

// app.listen(4000,()=>{console.
//     log("done")
// })