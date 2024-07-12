const Profile = require("../model/Profile");

// Create a new profile
exports.createProfile = async (req, res) => {
  try {
    const profile = new Profile(req.body);
    await profile.save();
    res.status(201).json(profile);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// Get all profiles
exports.getProfiles = async (req, res) => {
  try {
    const profiles = await Profile.find();
    res.status(200).json(profiles);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Get a single profile
exports.getProfileById = async (req, res) => {
  try {
    const profile = await Profile.findOne({ profile_id: req.params.id });
    if (!profile) return res.status(404).json({ message: "Profile not found" });
    res.status(200).json(profile);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Update a profile
exports.updateProfile = async (req, res) => {
  try {
    const profile = await Profile.findOneAndUpdate(
      { profile_id: req.params.id },
      req.body,
      { new: true }
    );
    if (!profile) return res.status(404).json({ message: "Profile not found" });
    res.status(200).json(profile);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// Delete a profile
exports.deleteProfile = async (req, res) => {
  try {
    const profile = await Profile.findOneAndDelete({
      profile_id: req.params.id,
    });
    if (!profile) {
      return res.status(404).json({ message: "Profile not found" });
    }else{
     res.status(200).json({ message: "Profile deleted" });
   }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
