const admin = require("firebase-admin");
const { firebaseConfig } = require("./firebaseConfig");
const { initializeApp } = require("firebase/app");
const { getStorage } = require("firebase/storage");
const { getAuth, createUserWithEmailAndPassword } = require("firebase/auth");
require('dotenv').config();

const serviceAccountKey = { 
  type: process.env.FIREBASE_TYPE,
  project_id: process.env.FIREBASE_PROJECT_ID,
  private_key_id: process.env.FIREBASE_PRIVATE_KEY_ID,
  private_key: process.env.FIREBASE_PRIVATE_KEY.replace(/\\n/g, '\n'),
  client_email: process.env.FIREBASE_CLIENT_EMAIL,
  client_id: process.env.FIREBASE_CLIENT_ID,
  auth_uri: process.env.FIREBASE_AUTH_URI,
  token_uri: process.env.FIREBASE_TOKEN_URI,
  auth_provider_x509_cert_url: process.env.FIREBASE_AUTH_PROVIDER_X509_CERT_URL,
  client_x509_cert_url: process.env.FIREBASE_CLIENT_X509_CERT_URL,
  universe_domain: process.env.FIREBASE_UNIVERSE_DOMAIN,
};

const firebase = initializeApp(firebaseConfig, {
  credential: admin.credential.cert(serviceAccountKey),
});
const firebaseAuth = getAuth(firebase);
const firebaseStorage = getStorage(firebase); 

admin.initializeApp({
  credential: admin.credential.cert(serviceAccountKey),
});

module.exports = {
  firebaseAuth,
  firebaseStorage,
  admin,
  createUserWithEmailAndPassword,
};
