// import slugify from "@sindresorhus/slugify";
const dotenv  = require("dotenv")
dotenv.config()
const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const cors = require("cors");
const postRoutes = require("./routes/posts.routes");
const authRoutes = require("./routes/auth.routes")
const { default: mongoose } = require("mongoose");
const port = process.env.PORT
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(cors());
app.use("/auth",authRoutes)
app.use("/post",postRoutes)
mongoose.connect(process.env.MONGO_URI).then((res)=>{
  console.log("Database has been connected")
}).catch((error)=>{
  console.log(error.message)
})
app.listen(port, () => {
  console.log(`app listening on port ${port}`);
});
