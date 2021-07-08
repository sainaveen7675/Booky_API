const Router = require("express").Router();

const AuthorModel = require("../../database/author");

/*
Route         /author
Description   Get all authors
Access        Public
Parameter     None
Methods       GET
*/
Router.get("/", async (req, res) => {
    const getAllAuthors = await AuthorModel.find();
    return res.json({getAllAuthors})
});

/*
Route         /author
Description   Get specific authors 
Access        Public
Parameter     name
Methods       GET
*/

Router.get("/:name", async (req, res) => {

  const getSpecificAuthor = await AuthorModel.findOne({ name: req.params.name });
     
  if (!getSpecificAuthor) {
    return res.json({
        error: `No author found for the name of ${req.params.name}`,
    });
  }
    
  return res.json({ author: getSpecificAuthor });
});

/*
Route         /author/book
Description   Get all authors based on books
Access        Public
Parameter     isbn
Methods       GET
*/
Router.get("/book/:books", async (req, res) => {
    const getBookAuthor = await AuthorModel.findOne({ books: req.params.books });
    
      if (!getBookAuthor) {
        return res.json({
          error: `No author found for the book of ${req.params.books}`,
        });
      }
    
      return res.json({ book: getBookAuthor });
});

/*
Route         /author/add
Description   Add new author
Access        Public
Parameter     None
Methods       POST
*/
Router.post("/add", (req, res) => {
    const { newAuthor } = req.body;
    AuthorModel.create(newAuthor);
    return res.json({ message: "new author is added"});
});

/*
Route         /author/update/name/
Description   Update author name
Access        Public
Parameter     id
Methods       PUT
*/
Router.put("/update/name/:id", async (req, res) => {

    const updatedAuthor = await AuthorModel.findOneAndUpdate(
      {
        id: req.params.id,
      },
      {
        name: req.body.newAuthorName,
      },
      {
        new: true,
      }
    );
  
    // database.author.forEach((author) => {
    //   if (author.id === parseInt(req.params.id)) {
    //     author.name = req.body.newAuthorName;
    //     return;
    //   }
    // });
  
    return res.json({ author: updatedAuthor });
});

/*
Route         /author/delete
Description   Delete a author
Access        Public
Parameter     id
Methods       DELETE
*/
Router.delete("/delete/:id", async (req, res) => {

    const updatedAuthorDatabase = await AuthorModel.findOneAndDelete({
      id: req.params.id,
    });
  
    // const updatedAuthorDatabase = database.author.filter(
    //   (author) => author.id !== parseInt(req.params.id)
    // );
    
    // database.author = updatedAuthorDatabase;
    return res.json({ author: updatedAuthorDatabase })
});


module.exports = Router;