const authFunctions = require("../controller/auth.ctrl")
const express = require("express");
const router = express.Router(); 

router.route("/signup").post(authFunctions.signUpFunction);
router.route("/login").post(authFunctions.loginFunction);
// this is not required (created just to get a token)
// router.route("/token").post(authFunctions.loginFunctio); 

module.exports = router;
