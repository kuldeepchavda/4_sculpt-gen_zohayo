const { getImageDownloadURL } = require("../utils/uploadImage");
const Posts = require("../model/Post");
const { v4: uuidv4 } = require("uuid");

// get all the posts
exports.getAll = async (req, res) => {
  const data = await Posts.find();
  res.status(200).json({ data: data });
};


// upload post
exports.uploadPost = async (req, res) => {
  const files = req.files;
  const jsonData = req.body;
 
  if (!files) {
    res.status(500).send("images not found");
  } else {
    const URLs = await Promise.all(
      files.map((file) => getImageDownloadURL("uuid", file))
    );
    console.log(URLs);
    const data = await Posts.create({
      postId:uuidv4(),
      imageUrl: URLs,
      heading: jsonData.heading,
      description: jsonData.description,
      userId:jsonData.userId
    });
    console.log(data);
    res.status(200).json(data);
  }
};


// get post by post id 
exports.getPostById = async(req,res)=>{
const {id} = req.params
const data = await Posts.findOne({postId:id})
if(data){
  res.status(200).json(data)
}else{
  res.status(400).send("Post not found")
}
}

exports.updateById = async(req,res)=>{
  const updatingData = req.body
  const {id} = req.params
  const data = await Posts.findOneAndUpdate(
    { postId: id },
    { $set: updatingData },
    {
      new: true,
    }
  );
  res.status(200).json({data:data})
}

exports.deleteById = async(req,res)=>{
  const {id} = req.params
  const data = await Posts.findOneAndDelete({postId:id})
  res.send(data)
}

