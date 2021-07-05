let books = [
    {
      ISBN: "12345Book",
      title: "Getting started with MERN",
      pubDate: "2021-07-07",
      language: "en",
      numPage: 250,
      authors: [1, 2],
      publication: 1,
      category: ["tech", "programming", "education", "thriller"],
    },
    {
      ISBN: "12345ONE",
      title: "Iam Sai Naveen ",
      pubDate: "2021-07-07",
      language: "en",
      numPage: 250,
      authors: [1, 2],
      publication: 1,
      category: ["tech", "programming", "education", "thriller"],
    },
];
  
const author = [
    {
      id: 1,
      name: "Sainaveen",
      books: ["12345Book", "1234566789Secret"],
    },
    { id: 2,
      name: "Elon Musk", 
      books: ["12345Book"],
    },
];
  
const publication = [
    {
      id: 1,
      name: "writex",
      books: ["12345Book"],
    },
    {
      id: 2,
      name: "Hemanth",
      books: ["12345ONE"],
    },
];

module.exports = {books, author, publication};