const Comments = require("../model/Comments")
const getDataByToken = require("../utils/getDataByToken")

const addComment = async (req, res) => {
  const { postId, comment,token } = req.body;
//   const token = req.headers.authorization.split(" ")[1];

  try {
    const decodedToken = await getDataByToken(token)
    const userId = decodedToken.uid;

    const CommentsOfPostByPostId = await Comments.find({postId:postId});
    if (!CommentsOfPostByPostId) {
      return res.status(404).json({ message: "Post not found" });
    }

    // Add the comment to the post's comments array
    const newComment = {
      userId,
      comment,
      timestamp: new Date(),
    };
    post.comments.push(newComment);

    // Save the updated post
    await post.save();

    res.status(200).json({ message: "Comment added successfully", post });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error adding comment" });
  }
};

module.exports = { addComment };
