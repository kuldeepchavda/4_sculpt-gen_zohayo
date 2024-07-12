const express = require("express");
const router = express.Router();
const profileController = require("../controller/profiles.ctrl");

router.post("/create", profileController.createProfile);
router.get("/getbyid/:id", profileController.getProfileById);
router.get("/getall", profileController.getProfiles);
router.put("/updatebyid/:id", profileController.updateProfile);
router.delete("/deletebyid/:id", profileController.deleteProfile);

module.exports = router;
