
const {firebaseConfig} = require("./firebaseConfig")
const {initializeApp} = require("firebase/app")
const {getStorage} = require("firebase/storage")
const firebase = initializeApp(firebaseConfig)
const firebaseStorage = getStorage(firebase);

module.exports = { firebaseStorage }