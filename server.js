require('dotenv').config()
const express = require ("express");
const app = express ();

const mongoose = require("mongoose");
const postRouter = require('./routes/posts');



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





  // Listen for HTTP request on PORT 4000
app.listen(PORT, () => {

    console.log(`Hello from Backend   PORT Number is  ${PORT}`);
  });