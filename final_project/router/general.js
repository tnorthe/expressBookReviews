const express = require('express');
let books = require("./booksdb.js");
let isValid = require("./auth_users.js").isValid;
let users = require("./auth_users.js").users;
const public_users = express.Router();
//let fs = require('fs');

const promise = () =>{
    return new Promise((resolve, reject) => {
        setTimeout(() => {
          resolve(books);
        }, 6000); 
      });
}

public_users.post("/register", (req,res) => {
    const username = req.body.username;
    const password = req.body.password;
    if (username && password) {
        if (!isValid(username)) { 
          users.push({"username":username,"password":password});
          return res.status(200).json({message: "User successfully registred. Now you can login"});
        } else {
          return res.status(404).json({message: "User already exists!"});    
        }
      } 
      return res.status(404).json({message: "Unable to register user."});
  //return res.status(300).json({message: "Yet to be implemented"});
});

// Get the book list available in the shop
public_users.get('/',function (req, res) {
    promise()
    .then((books) => {
      res.send(JSON.stringify(books, null, 4));
    })
    .catch((error) => {
      res.status(500).json({ error: 'Error fetching books' });
    });
    //res.send(JSON.stringify(books,null,4));
  //return res.status(300).json({message: JSON.stringify(books,null,4)});
});

// Get book details based on ISBN
public_users.get('/isbn/:isbn',function (req, res) {
  const isbn = req.params.isbn;
  promise()
  .then((books) => {
    res.send(books[isbn]);
  })
  .catch((error) => {
    res.status(500).json({ error: 'Error fetching books based on isbn' });
  });
  //let filtered_isbn = books.filter((book) => book.isbn === isbn);
  //res.send(books[isbn]);
  //return res.status(300).json({message: "Yet to be implemented"});
 });
  
// Get book details based on author
public_users.get('/author/:author',function (req, res) {
    const authr = req.params.author;
    promise()
    .then((books) => {
        var keys = Object.keys(books);
        keys.forEach((key) => {
            if(books[key].author === authr){
                res.send(books[key]);
            }
        });
    })
    .catch((error) => {
        res.status(500).json({ error: 'Error fetching books based on author' });
      });
    /*var keys = Object.keys(books);
  keys.forEach((key) => {
    if(books[key].author === authr){
        res.send(books[key]);
    }
  });*/
  
  //return res.status(300).json({message: "Yet to be implemented"});
});

// Get all books based on title
public_users.get('/title/:title',function (req, res) {
  const title = req.params.title;
  promise()
    .then((books) => {
        var keys = Object.keys(books);
        keys.forEach((key) => {
          if(books[key].title === title){
              res.send(books[key]);
          }
        });
    })
    .catch((error) => {
        res.status(500).json({ error: 'Error fetching books based on title' });
      });
  /*var keys = Object.keys(books);
  keys.forEach((key) => {
    if(books[key].title === title){
        res.send(books[key]);
    }
  });*/
  //return res.status(300).json({message: "Yet to be implemented"});
});

//  Get book review
public_users.get('/review/:isbn',function (req, res) {
  const isbn = req.params.isbn;
  res.send(books[isbn].reviews);
 
  //return res.status(300).json({message: "Yet to be implemented"});
});

module.exports.general = public_users;
