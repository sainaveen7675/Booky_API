const Router = require("express").Router();

// Database models
const PublicationModel = require("../../database/publication");

/*
Route         /publications
Description   Get all publication
Access        Public
Parameter     None
Methods       GET
*/
Router.get("/", async (req, res) => {
    const getAllPublications = await PublicationModel.find();
    return res.json({ getAllPublications });
});

/*
Route         /publications
Description   Get specific publication 
Access        Public
Parameter     name
Methods       GET
*/
Router.get("/:name", async (req, res) => {
    const getSpecificpublication = await PublicationModel.findOne({ name: req.params.name });
    
      if (!getSpecificpublication) {
        return res.json({
          error: `No publication found for the name of ${req.params.name}`,
        });
      }
    
      return res.json({ publications: getSpecificpublication });
});

/*
Route         /publications/books
Description   Get list of publications based on book 
Access        Public
Parameter     isbn
Methods       GET
*/
Router.get("/books/:ISBN", async (req, res) => {
    const getBookPublication = await PublicationModel.findOne({ books: req.params.ISBN });
    
      if (!getBookPublication) {
        return res.json({
          error: `No publication found for the book of ${req.params.ISBN}`,
        });
      }
    
      return res.json({ publications: getBookPublication });
});

/*
Route         /publication/add
Description   Add new publications
Access        Public
Parameter     None
Methods       POST
*/
Router.post("/add", (req, res) => {
    const { newPublication } = req.body;
    PublicationModel.create(newPublication);
    return res.json({ message: "new publication is added" });
});

/*
Route         /publication/update/name/
Description   Update the publication name
Access        Public
Parameter     id
Methods       PUT
*/
Router.put("/update/name/:id", async (req, res) => {

    const updatedPublication = await PublicationModel.findOneAndUpdate(
      {
        id: req.params.id,
      },
      {
        name: req.body.newPublicationName,
      },
      {
        new: true,
      }
    );
  
    // database.publication.forEach((publication) => {
    //   if (publication.id === parseInt(req.params.id)) {
    //     publication.name = req.body.newPublicationName;
    //     return;
    //   }
    // });
  
    return res.json({ publication: updatedPublication });
});

/*
Route         /publication/update/book
Description   Update/add books to publications
Access        Public
Parameter     isbn
Methods       PUT
*/
Router.put("/update/book/:isbn", async (req, res) => {
    // update the publication database
  
    const updatedPublication = await PublicationModel.findOneAndUpdate(
      {
        id: req.body.pubId,
      },
      {
        $addToSet: {
          books: req.params.isbn,
        }
      },
      {
        new: true,
      }
    );
  
    // database.publication.forEach((publication) => {
    //   if(publication.id === req.body.pubId) {
    //     return publication.books.push(req.params.isbn);
    //   }
    // });
    // update the book database
  
    const updatedBook = await BookModel.findOneAndUpdate(
      {
        ISBN: req.params.isbn,
      },
      {
        $addToSet: {
          publication: req.body.pubId,
        }
      },
      {
        new: true,
      },
    );
  
    // database.books.forEach((book) => {
    //   if (book.ISBN === req.params.isbn) {
    //     book.publication = req.body.pubId;
    //     return;
    //   }
    // });
  
    return res.json({
      books: updatedBook, 
      publication: updatedPublication, 
      message: "Successfully updated publication",
    });
});

/*
Route         /publication/delete
Description   Delete a publication
Access        Public
Parameter     id
Methods       DELETE
*/
Router.delete("/delete/:id", async (req, res) => {

    const updatedPublicationDatabase = await PublicationModel.findOneAndDelete({
      id: req.params.id,
    });
  
    // const updatedPublicationDatabase = await PublicationModel.findOneAndDelete({
    //   id: req.params.id,
    // });
    
    // database.publication = updatedPublicationDatabase;
    return res.json({ publication: updatedPublicationDatabase })
});

/*
Route         /publication/delete/book
Description   Delete a book from publication
Access        Public
Parameter     isbn, publication id
Methods       DELETE
*/
Router.delete("/delete/book/:isbn/:pubId", async (req, res) => {
    // update publication database
    const updatedPublication = await PublicationModel.findOneAndUpdate(
      {
        id: req.params.pubId,
      },
      {
        $pull: {
          books: req.params.isbn,
        }
      },
      {
        new: true,
      }
    );
  
    // database.publication.forEach((publication) => {
    //   if(publication.id === parseInt(req.params.pubId)){
    //     const newBooksList = publication.books.filter(
    //       (book) => book !== req.params.isbn
    //     );
    //     publication.books = newBooksList;
    //     return;
    //   }
    // });
    
    // update book database
    const updatedBook = await BookModel.findOneAndUpdate(
      {
        ISBN: req.params.isbn,
      },
      {
        $pull: {
          publication: req.params.pubId,
        },
      },
      {
        new: true,
      },
    );
  
    // database.books.forEach((book) => {
    //   if(book.ISBN === req.params.isbn){
    //     book.publication = 0;
    //     return;
    //   }
    // });
  
    return res.json({books: updatedBook, publications: updatedPublication });
});

module.exports = Router;