require('dotenv').config()
const express = require ("express");
const app = express ();
const mongoose = require("mongoose");
const postRoute = require('./routes/posts');
const categoryRoute = require("./routes/categories");





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



  app.use("/blog/v1/posts", postRoute);
  app.use("/blog/v1/categories", categoryRoute);

  // Listen for HTTP request 
app.listen(PORT, () => {

    console.log(`Hello from Backend   PORT Number is  ${PORT}`);
  });