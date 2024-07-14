const admin = require("firebase-admin");


const {firebaseConfig} = require("./firebaseConfig")
const {initializeApp} = require("firebase/app")
const {getStorage} = require("firebase/storage")

const serviceAccountKey = require("./serviceAccountKey.json");


const firebase = initializeApp(firebaseConfig, {
  credential: admin.credential.cert(serviceAccountKey),
});
const firebaseStorage = getStorage(firebase);
admin.initializeApp({
  credential: admin.credential.cert(serviceAccountKey),
});


// admin.initializeApp();

module.exports = { firebaseStorage,admin }
