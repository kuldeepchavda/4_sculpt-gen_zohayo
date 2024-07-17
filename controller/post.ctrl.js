const { getImageDownloadURL } = require("../utils/uploadImage");
const Posts = require("../model/Post");
const { v4: uuidv4 } = require("uuid");
const Users = require("../model/Users");
const getDataByToken = require("../utils/getDataByToken");
const Comments = require("../model/Comments");
// get all the posts

exports.getAll = async (req, res) => {
  const page = parseInt(req.params.page, 10) || 1; // Get page from URL, default to 1 if not provided
  const limit = 3; // Number of posts per page
  const skip = (page - 1) * limit; // Calculate the number of posts to skip

  try {
    const totalPosts = await Posts.countDocuments(); // Get total number of posts
    const totalPages = Math.ceil(totalPosts / limit); // Calculate total pages
    const data = await Posts.find().skip(skip).limit(limit); // Fetch paginated posts

    res.status(200).json({
      data: data,
      currentPage: page,
      totalPages: totalPages,
    });
  } catch (error) {
    res.status(500).json({ error: "An error occurred while fetching posts" });
  }
};

// upload post// upload post
exports.uploadPost = async (req, res) => {
  const files = req.files;
  const jsonData = req.body;
  const rawToken = req.header("Authorization");
  const token = rawToken.replace("Bearer", "").trim();
  const data = await getDataByToken(token);
  const userId = data.user_id;
  const userData = await Users.findOne({ userId: userId });
  const color = userData.color;
  const username = userData.username;

  if (!files || files.some(file => !['image/png', 'image/jpeg', 'image/jpg'].includes(file.mimetype))) {
    res.status(400).send("Invalid or missing images. Only PNG, JPG, and JPEG are allowed.");
  } else {
    const URLs = await Promise.all(files.map((file) => getImageDownloadURL("uuid", file)));
    const postId = uuidv4();

    const data = await Posts.create({
      username: username,
      color: color,
      postId: postId,
      imageUrl: URLs,
      heading: jsonData.heading,
      description: jsonData.description,
      userId: userId
    });

    const response = await Comments.create({ postId: postId, userId: userId });
    await Users.updateOne({ userId: userId }, { $push: { posts: postId } });
    const userData = await Users.findOne({ userId: userId });
    console.log("this guy is uploading the post", userData);
    res.status(200).json({ data, response });
  }
};

// get post by post id
exports.getPostById = async (req, res) => {
  const { id } = req.params;
  const data = await Posts.findOne({ postId: id });
  if (data) {
    res.status(200).json(data);
  } else {
    res.status(400).send("Post not found");
  }
};
exports.updateById = async (req, res) => {
  const updatingData = req.body;
  const files = req.files;
  const { id } = req.params;

  if (
    files &&
    files.some(
      (file) =>
        !["image/png", "image/jpeg", "image/jpg"].includes(file.mimetype) 
    )
  ) {
    res
      .status(400)
      .send("Invalid or missing images. Only PNG, JPG, and JPEG are allowed.");
  } else { 
    if (files) {
      const URLs = await Promise.all(
        files.map((file) => getImageDownloadURL("uuid", file))
      );
      updatingData.imageUrl = URLs;
    }

    const data = await Posts.findOneAndUpdate(
      { postId: id },
      { $set: updatingData }, 
      { new: true }
    );

    res.status(200).json({ data: data });
  }
};


exports.deleteById = async (req, res) => {
  const { id } = req.params;
  const data = await Posts.findOneAndDelete({ postId: id });
  res.send(data);
};
