const Comments = require("../model/Comments");
const Profile = require("../model/Profile");
const getDataByToken = require("../utils/getDataByToken")

const addComment = async (req, res) => {
  const { postId, comment,token } = req.body;
//   const token = req.headers.authorization.split(" ")[1];

  try {
    const decodedToken = await getDataByToken(token)
    const userId = decodedToken.uid;
    const userData = await Profile.find({userId:userId});
    const username = userData[0].username;
    const color = userData[0].color
    const CommentsOfPostByPostId = await Comments.find({postId:postId});
    if (!CommentsOfPostByPostId) {
      return res.status(404).json({ message: "Post not found" });
    }
 
    const newComment = {
      userId,
      comment,
      username,
      color,
      timestamp: new Date(),
    };
    console.log(newComment)
   const addedComment = await Comments.updateOne(
      { postId: postId },
      {
        $push: { comments: newComment },
        $inc: { totalComments: 1 },
      }
    );
 console.log(addComment)
    res
      .status(200)
      .json({ message: "Comment added successfully", addedComment });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error adding comment" });
  }
};

const getCommentsByPostId = async(req,res)=>{
  const {id} = req.params;
  const requiredCommentData = await Comments.find({postId:id});
  res.send(requiredCommentData)
}

 
const deleteComment = async (req, res) => {
  const { postId, commentId, token } = req.body;

  try {
    const decodedToken = await getDataByToken(token);
    const userIdFromToken = decodedToken.uid;

    const respectivePostData = await Comments.findOne({ postId: postId });
    if (!respectivePostData) {
      return res.status(404).json({ message: "Post not found" });
    }

    const commentIndex = respectivePostData.comments.findIndex(
      (comment) => comment._id.toString() === commentId
    );

    if (commentIndex === -1) {
      return res.status(404).json({ message: "Comment not found" });
    }

    const comment = respectivePostData.comments[commentIndex];
    if (respectivePostData.userId !== userIdFromToken) {
      return res
        .status(403)
        .json({ message: "You are not authorized to delete this comment" });
    }

  respectivePostData.comments.splice(commentIndex, 1);
  respectivePostData.totalComments = respectivePostData.comments.length;
    
    await respectivePostData.save();

    res.status(200).json({ message: "Comment deleted successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error deleting comment" });
  }
};
 
module.exports = { addComment, getCommentsByPostId, deleteComment };
