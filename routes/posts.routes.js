const express = require("express")
const router = express.Router()
const postControllers = require("../controller/post.ctrl.js")

const multer  = require("multer")
const storage = multer.memoryStorage();
const upload = multer({ storage });
// this operations are held by post id not the id provided by mongodb,


router.route("/").get(postControllers.getAll)
router.route("/upload").post(upload.array("image",5),postControllers.uploadPost);
router.route("/:id").get(postControllers.getPostById);
router.route("/update/:id").put(postControllers.updateById);
router.route("/delete/:id").delete(postControllers.deleteById);

module.exports = router