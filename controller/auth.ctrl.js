const admin = require("firebase-admin");
const Users = require("../model/Users.js");
const generateUsername = require("../utils/getUserName.js");
const getDataByToken = require("../utils/getDataByToken.js");
const axios = require("axios");
const Profile =  require("../model/Profile.js")
// const serviceAccountKey = require("../serviceAccountKey.json");
const {
  getAuth,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
} = require("firebase/auth");
const auth = getAuth();
// this is was created just to get the idToken , not necessary fn
exports.dummySignup = async (req, res) => {
  const { email, password } = req.body;
  await createUserWithEmailAndPassword(auth, email, password)
    .then(async (response) => {
      // console.log(response); 
      const idToken = response.user.stsTokenManager.accessToken;
      console.log(idToken);
      const signUpData = await axios.post(
        "http://localhost:1000/auth/signup", // hey chat gpt this is an endpoint which will hit signUpFunction

        {
          token: idToken,
        }
      );  
    res.status(200).send(signUpData.data) 
    }) 
    .catch((ERR) => {
      console.log(ERR);
    });
};

exports.signUpFunction = async (req, res) => {
  const { token } = req.body;
  const data = await getDataByToken(token);
  const email = data.email;
  const username = await generateUsername(email);
  console.log(username);
  const userId = data.uid;
  
  const entryInProfile = await Profile.create({
    email,
    userId,
    username,
  })
  const entryInUsers = await Users.create({
    email,
    username,
    userId,
  });
  if (entryInUsers && entryInProfile) {
    console.log("entryInUsers", entryInUsers);            
    // res.status(200).send(true);
    res.send({entryInUsers,entryInProfile});  
  } else {
    res.send(false);
  }
};



exports.loginFunction = async (req, res) => {
  try {
    const { token } = req.body;
    
    const data = await getDataByToken(token);
    
    if (data) {
      const userId = data.uid;
      const profileData = await Profile.findOne({ userId: userId });

      if (profileData) {
        res.status(200).json(profileData);
      } else {
        const newProfileData = await Profile.create({ userId: userId });
        res.status(200).json(newProfileData);
      }
    } else {
      res.status(400).json({ message: 'Invalid token' });
    }
  } catch (error) {
    console.error('Error in loginFunction:', error);
    res.status(500).json({ message: 'Internal Server Error' });
  }
};
