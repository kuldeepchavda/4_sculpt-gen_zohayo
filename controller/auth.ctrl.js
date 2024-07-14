const admin = require("firebase-admin");
const Users= require("../model/Users.js")
const getDataByToken = require("../utils/getDataByToken.js")
// const serviceAccountKey = require("../serviceAccountKey.json");
const {
  getAuth,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
} = require("firebase/auth");
const auth = getAuth();




exports.signUpFunction = async (req, res) => {
  const { token} = req.body;
  const data = await getDataByToken(token)

    const email = data.email
    const userId = data.uid;
    console.log("data",email,userId)
      const entryInUsers = await Users.create({
        email,
        userId
      });
      console.log("entryInUsers",entryInUsers)
      res.status(200).send({
        message: "data saved",  
        entryInUsers    
      });  
};

exports.loginFunction = async(req,res)=>{
  const { token } = req.body;
      // const token = userCredential.user.stsTokenManager.accessToken;
//  const data = await getDataByToken(token)
 
 admin
   .auth()
   .verifyIdToken(token)
   .then((response) => {
     console.log("the data verified by back-end");
     res.status(200).send(response);
   })
   .catch((error) => {
     console.log("error", error);
   });
}



// this is dummy data , please neglect 
exports.loginFunctio = async (req, res) => {
  const { email, password } = req.body;
  await createUserWithEmailAndPassword(auth, email, password)
    .then(async (userCredential) => {
      const token = userCredential.user.stsTokenManager.accessToken;

      console.log(token);
      const data = admin
        .auth()
        .verifyIdToken(token)
        .then((response) => {
          console.log("the data verified by back-end");
          res.status(200).send(userCredential);
        })
        .catch((error) => {
          console.log("error", error);
        });
    })
    .catch((err) => {
      console.log(err);
    });
};

