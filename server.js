require('dotenv').config()
const express = require ("express");
const app = express ();
const mongoose = require("mongoose");
const postRoute = require('./routes/posts');
const categoryRoute = require("./routes/categories");
const multer = require("multer");//multer for upload files





const PORT = process.env.PORT;




app.use(express.json()); //to can use sent the data as json format 




//connect our app with our cloud DB
mongoose
  .connect(process.env.MONGODB_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true,
    useFindAndModify:true
  })
  .then(console.log("Connected to MongoDB"))
  .catch((err) => console.log(err));

  //creat storage to save the photo coming from user
  const storage = multer.diskStorage({
    //call back finction take care about error 
    destination: (req, file, callback) => {
      //(null , name of our destination which is images folder )
      callback(null, "images");
    },
    //the file name will be the same one comming from user
     filename: (req, file, callback) => {
      callback(null, "Hello.png");// hardcoded because i used post man
     // callback(null, req.body.name); //In react we will use this
      
    },
  });


  //to upload single file
  const upload = multer({ storage: storage });
  app.post("/blog/v1/upload", upload.single("file"), (req, res) => {
  res.status(200).json("File has been uploaded ...");
});



  app.use("/blog/v1/posts", postRoute);
  app.use("/blog/v1/categories", categoryRoute);

  // Listen for HTTP request PORT
app.listen(PORT, () => {

    console.log(`Hello from Backend   PORT Number is  ${PORT}`);
  });