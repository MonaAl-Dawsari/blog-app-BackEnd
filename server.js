const express = require ("express");
const app = express ();
const dotenv = require("dotenv");
const mongoose = require("mongoose");






dotenv.config();         //to use env file
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



app.listen("5000", () => {
    console.log("Hello from Backend .");
  });