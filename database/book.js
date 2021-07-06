const mongoose = require("mongoose");

// Creating a book schena
const BookSchema = mongoose.Schema({
    ISBN: String,
    title: String,
    pubDate: String,
    language: String,
    numPage: Number,
    authors: [Number],
    publication: Number,
    category: [String],
});

// Create a book model
const BookModel = mongoose.model(BookSchema);

module.export = BookModel;