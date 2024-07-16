const express = require("express");
const router = express.Router();
const commentController = require("../controller/comment.ctrl");

router.post("/addcomment", commentController.addComment);
router.get("/get/:id", commentController.getCommentsByPostId);
router.route("/delete").delete(commentController.deleteComment)
module.exports = router;
