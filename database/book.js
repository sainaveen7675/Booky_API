const mongoose = require("mongoose");

// Creating a book schena
const BookSchema = mongoose.Schema({
    ISBN: String,
    title: String,
    pubDate: String,
    language: String,
    numPage: Number,
    authors: [Number],
    publication: [String],
    category: [String],
});

// Create a book model
const BookModel = mongoose.model("books",BookSchema);

module.exports = BookModel;