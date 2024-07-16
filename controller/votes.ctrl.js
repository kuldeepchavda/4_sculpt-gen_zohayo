const Votes = require("../model/Votes");
const getDataByToken= require("../utils/getDataByToken")
   const upvote = async (req, res) => {
     const { postId, token } = req.body;

     try {
       // Decode the token to get the user ID
       const decodedToken = await getDataByToken(token);
       const userId = decodedToken.uid;

       // Find the post by ID
       let post = await Votes.findOne({ postId: postId });

       // If post doesn't exist, create a new one
       if (!post) {
         post = new Votes({ postId: postId, upvotes: [], downvotes: [] });
       }

       // Check if user exists in downvotes array
       const downvoteIndex = post.downvotes.findIndex(
         (vote) => vote.userId === userId
       );
       if (downvoteIndex !== -1) {
         post.downvotes.splice(downvoteIndex, 1); // Remove user from downvotes
       }

       // Check if user already exists in upvotes array
       const upvoteIndex = post.upvotes.findIndex(
         (vote) => vote.userId === userId
       );
       if (upvoteIndex === -1) {
         // Add user to upvotes array
         post.upvotes.push({ userId, timestamp: new Date() });
       }

       // Save the updated post
       await post.save();

       res.status(200).json({ message: "Upvoted successfully", post });
     } catch (error) {
       console.error(error);
       res.status(500).json({ message: "Error upvoting the post" });
     }
   };
 

const downvote = async (req, res) => {
     const { postId, token } = req.body;

     try {
       // Decode the token to get the user ID
       const decodedToken = await getDataByToken(token);
       const userId = decodedToken.uid;

       // Find the post by ID
       let post = await Votes.findOne({ postId: postId });

       // If post doesn't exist, create a new one
       if (!post) {
         post = new Votes({ postId: postId, upvotes: [], downvotes: [] });
       }

       // Check if user exists in upvotes array
       const upvoteIndex = post.upvotes.findIndex(
         (vote) => vote.userId === userId
       );
       if (upvoteIndex !== -1) {
         post.upvotes.splice(upvoteIndex, 1); // Remove user from upvotes
       }

       // Check if user already exists in downvotes array
       const downvoteIndex = post.downvotes.findIndex(
         (vote) => vote.userId === userId
       );
       if (downvoteIndex === -1) {
         // Add user to downvotes array
         post.downvotes.push({ userId, timestamp: new Date() });
       }

       // Save the updated post
       await post.save();

       res.status(200).json({ message: "Downvoted successfully", post });
     } catch (error) {
       console.error(error);
       res.status(500).json({ message: "Error downvoting the post" });
     }
   };



module.exports = { upvote, downvote };
