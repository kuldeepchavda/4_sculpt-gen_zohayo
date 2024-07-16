const express = require("express")
const router = express.Router()

const votesController = require("../controller/votes.ctrl.js");

router.route("/upvote").get(votesController.upvote)
router.route("/downvote").get(votesController.downvote)
module.exports = router