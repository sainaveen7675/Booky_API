

// Initializing Express Router
const Router = require("express").Router();

// Database models
const BookModel = require("../../database/book");

/*
Route         /
Description   Get all books
Access        Public
Parameter     None
Methods       GET
*/
Router.get("/", async (req, res) => {
    const getAllBooks = await BookModel.find();
    return res.json(getAllBooks);
});

/*
Route         /is
Description   Get specific book based on ISBN
Access        Public
Parameter     ISBN
Methods       GET
*/
Router.get("/is/:isbn", async (req, res) => {
    const getSpecificBook = await BookModel.findOne({ ISBN: req.params.isbn });
  
    // const getSpecificBook = database.books.filter(
    //   (book) => book.ISBN === req.params.ISBN
    // )
  
    // --> null = !
    if (!getSpecificBook) {
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
Router.get("/la/:language", async (req, res) => {

    const getLanguageBooks = await BookModel.findOne({ language: req.params.language });
    
    if (!getLanguageBooks) {
      return res.json({
        error: `No book found for the language of ${req.params.language}`,
      });
    }
  
    return res.json({ book: getLanguageBooks });
});

/*
Route         /c
Description   Get specific book based on category
Access        Public
Parameter     category
Methods       GET
*/
Router.get("/c/:category", async (req, res) => {

    const getCategoryBook = await BookModel.findOne({
      category: req.params.category,
    });
  
    // const getSpecificBook = database.books.filter(
    // (book) => book.category.includes(req.params.category)
    // );
  
    if (!getCategoryBook) {
      return res.json({
        error: `No book found for the category of ${req.params.category}`,
      });
    }
  
    return res.json({ book: getCategoryBook });
});

/*
Route         /book/add
Description   Add new book
Access        Public
Parameter     None
Methods       POST
*/
Router.post("/add", async (req, res) => {
    const { newBook } = req.body;
    BookModel.create(newBook);
    return res.json({ message: "new book is added" });
});

/*
Route         /book/update/title/
Description   Update book title
Access        Public
Parameter     ISBN
Methods       PUT
*/
Router.put("/update/title/:isbn", async (req, res) => {

    const updatedBook = await BookModel.findOneAndUpdate(
      {
        ISBN: req.params.isbn,
      },
      {
        title: req.body.bookTitle,
      },
      {
        new: true,
      }
    );
  
    // database.books.forEach((book) => {
    //   if (book.ISBN === req.params.isbn) {
    //     book.title = req.body.newBookTitle;
    //     return;
    //   }
    // });
  
    return res.json({ books: updatedBook });
});

/*
Route         /book/update/author
Description   Update/add new author for the book
Access        Public
Parameter     ISBN
Methods       PUT
*/
Router.put("/update/author/:isbn", async (req, res) => {
    // update book database
  
    const updatedBook = await BookModel.findOneAndUpdate(
      {
        ISBN: req.params.isbn,
      },
      {
        $addToSet: {
          authors : req.body.newAuthor,
        }
      },
      {
        new: true,
      }
      );
  
    // database.books.forEach((book) => {
    //   if (book.ISBN === req.params.isbn) {
    //     return book.author.push(parseInt(req.params.authorId));
    //   }
    // });
    
    // // update author database
  
    const updatedAuthor = await AuthorModel.findOneAndUpdate(
      {
        id: req.body.newAuthor,
      },
      {
        $addToSet: {
          books: req.params.isbn,
        },
      },
      {
        new: true,
      }
    );
  
    // database.author.forEach((author) => {
    //   if (author.id === parseInt(req.params.authorId))
    //   return author.books.push(req.params.isbn);
    // });
  
    return res.json({ 
      books: updatedBook,
      author: updatedAuthor,
      message: "new author was updated", 
    });
});

/*
Route         /book/delete
Description   Delete a book
Access        Public
Parameter     isbn
Methods       DELETE
*/
Router.delete("/delete/:isbn", async (req, res) => {

    const updatedBookDatabase = await BookModel.findOneAndDelete({
      ISBN: req.params.isbn,
    });
  
    // const updatedBookDatabase = database.books.filter(
    //   (book) => book.ISBN !== req.params.isbn
    // );
    
    // database.books = updatedBookDatabase;
    return res.json({ books: updatedBookDatabase });
});

/*
Route         /book/delete/author
Description   Delete an author from the book
Access        Public
Parameter     isbn, author id
Methods       DELETE
*/
Router.delete("/delete/author/:isbn/:authorId", async (req, res) => {
    // update the book database
  
    const updatedBook = await BookModel.findOneAndUpdate(
      {
        ISBN: req.params.isbn,
      },
      {
        $pull: {
          authors: parseInt(req.params.authorId),
        }
      },
      {
        new: true
      }
    );
  
  
    // database.books.forEach((book) => {
    //   if(book.ISBN === req.params.isbn){
    //     const newAuthorList = book.authors.filter(
    //       (author) => author !== parseInt(req.params.authorId)
    //     );
    //     book.authors = newAuthorList;
    //     return;
    //   }
    // });
  
    // update the author database
  
    const updatedAuthor = await AuthorModel.findOneAndUpdate(
      {
        id: parseInt(req.params.authorId),
      },
      {
        $pull: {
          books: req.params.isbn,
        },
      },
      {
        new: true,
      },
    );
  
    // database.author.forEach((author) => {
    //   if(author.id === parseInt(req.params.authorId)){
    //     const newBookList = author.books.filter(
    //       (book) => book !== req.params.isbn
    //     );
  
    //     author.books = newBookList;
    //     return;
    //   }
    // });
    return res.json({
      message: "author was deleted",
      books: updatedBook, 
      author:updatedAuthor
    });
});

module.exports = Router;