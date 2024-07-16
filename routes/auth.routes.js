const authFunctions = require("../controller/auth.ctrl")
const express = require("express");
const router = express.Router(); 
const Users = require("../model/Users")
const axios = require("axios");
router.route("/getusers").get(async(req,res)=>{
const response = await Users.find();

res.send(response)
})
router.route("/dummysignup").post(authFunctions.dummySignup);
router.route("/signup").post(authFunctions.signUpFunction);
router.route("/login").post(authFunctions.loginFunction);
module.exports = router;