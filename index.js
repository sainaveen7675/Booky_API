const express = require("express");

// Database
const database = require("./database");

// Initialization
const booky = express();

// Configuration
booky.use(express.json());


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
booky.get("/is/:ISBN", (req, res) => {
  const getSpecificBook = database.books.filter(
    (book) => book.ISBN === req.params.ISBN
  );

  if (getSpecificBook.length === 0) {
    return res.json({
      error: `No book found for the ISBN of ${req.params.ISBN}`,
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
booky.get("/author/book/:ISBN", (req, res) => {
  const getSpecificAuthor = database.author.filter(
    (author) => author.books.includes(req.params.ISBN)
    );
  
    if (getSpecificAuthor.length === 0) {
      return res.json({
        error: `No author found for the book of ${req.params.ISBN}`,
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
booky.get("/publications/books/:ISBN", (req, res) => {
  const getSpecificpublication = database.publication.filter(
    (publications) => publications.books.includes(req.params.ISBN)
    );
  
    if (getSpecificpublication.length === 0) {
      return res.json({
        error: `No publication found for the book of ${req.params.ISBN}`,
      });
    }
  
    return res.json({ publications: getSpecificpublication });
})

/*
Route         /book/add
Description   Add new book
Access        Public
Parameter     None
Methods       POST
*/
booky.post("/book/add", (req, res) => {
  const { newBook } = req.body;
  database.books.push(newBook);
  return res.json({ books: database.books });
});

/*
Route         /author/add
Description   Add new author
Access        Public
Parameter     None
Methods       POST
*/
booky.post("/author/add", (req, res) => {
  const { newAuthor } = req.body;
  database.author.push(newAuthor);
  return res.json({ authors: database.author });
})

/*
Route         /book/update/title/
Description   Update book title
Access        Public
Parameter     ISBN
Methods       PUT
*/
booky.put("/book/update/title/:isbn", (req, res) => {
  database.books.forEach((book) => {
    if (book.ISBN === req.params.isbn) {
      book.title = req.body.newBookTitle;
      return;
    }
  });

  return res.json({ books: database.books });
});

/*
Route         /book/update/author
Description   Update/add new author for the book
Access        Public
Parameter     ISBN
Methods       PUT
*/
booky.put("/book/update/author/:isbn/:authorId", (req, res) => {
  // update book database
  database.books.forEach((book) => {
    if (book.ISBN === req.params.isbn) {
      return book.author.push(parseInt(req.params.authorId));
    }
  });
  
  // update author database
  database.author.forEach((author) => {
    if (author.id === parseInt(req.params.authorId))
    return author.books.push(req.params.isbn);
  });

  return res.json({ books: database.books, author: database.author })
});

/*
Route         /author/update/name/
Description   Update author name
Access        Public
Parameter     id
Methods       PUT
*/
booky.put("/author/update/name/:id", (req, res) => {
  database.author.forEach((author) => {
    if (author.id === parseInt(req.params.id)) {
      author.name = req.body.newAuthorName;
      return;
    }
  });

  return res.json({ author: database.author });
});

/*
Route         /publication/add
Description   Add new publications
Access        Public
Parameter     None
Methods       POST
*/
booky.post("/publication/add", (req, res) => {
  const { newPublication } = req.body;
  database.publication.push(newPublication);
  return res.json({ publications: database.publication });
});

/*
Route         /publication/update/name/
Description   Update the publication name
Access        Public
Parameter     id
Methods       PUT
*/
booky.put("/publication/update/name/:id", (req, res) => {
  database.publication.forEach((publication) => {
    if (publication.id === parseInt(req.params.id)) {
      publication.name = req.body.newPublicationName;
      return;
    }
  });

  return res.json({ publication: database.publication });
});

booky.listen(3000, () => console.log("Hey server is running!"));