const express = require("express");

// Database
const database = require("./database");

// Initialization
const booky = express();


/*
Route         /
Description   Get all books
Access        Public
Parameter     None
Methods       GET
*/
booky.get("/", (req, res) => {
  return res.json({ books: database.books });
}
);

/*
Route         /is
Description   Get specific book based on ISBN
Access        Public
Parameter     ISBN
Methods       GET
*/
booky.get("/is/:isbn", (req, res) => {
  const getSpecificBook = database.books.filter(
    (book) => book.ISBN === req.params.isbn
  );

  if (getSpecificBook.length === 0) {
    return res.json({
      error: `No book found for the ISBN of ${req.params.isbn}`,
    });
  }

  return res.json({ book: getSpecificBook });
});

/*
Route         /la
Description   Get list of books based on languages
Access        Public
Parameter     language
Methods       GET
*/
booky.get("/la/:language", (req, res) => {
  const getSpecificBook = database.books.filter(
  (book) => book.language.includes(req.params.language)
  );

  if (getSpecificBook.length === 0) {
    return res.json({
      error: `No book found for the language of ${req.params.language}`,
    });
  }

  return res.json({ book: getSpecificBook });
});


/*
Route         /c
Description   Get specific book based on category
Access        Public
Parameter     category
Methods       GET
*/
booky.get("/c/:category", (req, res) => {
  const getSpecificBook = database.books.filter(
  (book) => book.category.includes(req.params.category)
  );

  if (getSpecificBook.length === 0) {
    return res.json({
      error: `No book found for the category of ${req.params.category}`,
    });
  }

  return res.json({ book: getSpecificBook });
});

/*
Route         /author
Description   Get all authors
Access        Public
Parameter     None
Methods       GET
*/
booky.get("/author", (req, res) => {
  return res.json({ authors: database.author})
});

/*
Route         /author
Description   Get specific authors 
Access        Public
Parameter     name
Methods       GET
*/

booky.get("/author/:name", (req, res) => {
  const getSpecificAuthor = database.author.filter(
    (author) => author.name.includes(req.params.name)
    );
  
    if (getSpecificAuthor.length === 0) {
      return res.json({
        error: `No author found for the name of ${req.params.name}`,
      });
    }
  
    return res.json({ author: getSpecificAuthor });
})

/*
Route         /author/book
Description   Get all authors based on books
Access        Public
Parameter     isbn
Methods       GET
*/
booky.get("/author/book/:isbn", (req, res) => {
  const getSpecificAuthor = database.author.filter(
    (author) => author.books.includes(req.params.isbn)
    );
  
    if (getSpecificAuthor.length === 0) {
      return res.json({
        error: `No author found for the book of ${req.params.isbn}`,
      });
    }
  
    return res.json({ book: getSpecificAuthor });
})

/*
Route         /publications
Description   Get all publication
Access        Public
Parameter     None
Methods       GET
*/
booky.get("/publications", (req, res) => {
  return res.json({ publications: database.publication});
});

/*
Route         /publications
Description   Get specific publication 
Access        Public
Parameter     name
Methods       GET
*/
booky.get("/publications/:name", (req, res) => {
  const getSpecificpublication = database.publication.filter(
    (publications) => publications.name.includes(req.params.name)
    );
  
    if (getSpecificpublication.length === 0) {
      return res.json({
        error: `No publication found for the name of ${req.params.name}`,
      });
    }
  
    return res.json({ publications: getSpecificpublication });
})

/*
Route         /publications/books
Description   Get list of publications based on book 
Access        Public
Parameter     isbn
Methods       GET
*/
booky.get("/publications/books/:isbn", (req, res) => {
  const getSpecificpublication = database.publication.filter(
    (publications) => publications.books.includes(req.params.isbn)
    );
  
    if (getSpecificpublication.length === 0) {
      return res.json({
        error: `No publication found for the book of ${req.params.isbn}`,
      });
    }
  
    return res.json({ publications: getSpecificpublication });
})


booky.listen(3000, () => console.log("HEy server is running! 😎"));