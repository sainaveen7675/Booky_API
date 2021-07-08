require("dotenv").config();

// Frame work
const express = require("express");
const mongoose = require("mongoose");


// Microservices Routes
const Books = require("./API/Book");
const Authors = require("./API/Author");
const Publications = require("./API/Publication");


// Initialization 
const booky = express();

// Configuration
booky.use(express.json());

// Establish database connection
mongoose.connect(process.env.MONGO_URL,
  {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: false,
    useCreateIndex: true,
  }
).then(() => console.log("connection established..!!!"));

// Initializing Microservices
booky.use("/book", Books);
booky.use("/author", Authors);
booky.use("/Publication", Publications);


booky.listen(3000, () => console.log("Hey server is running!"));