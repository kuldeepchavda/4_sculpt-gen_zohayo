const authFunctions = require("../controller/auth.ctrl")
const express = require("express");
const router = express.Router();

router.route("/signup").post(authFunctions.signUpFunction);
router.route("/login").post(authFunctions.loginFunction);

module.exports = router;
