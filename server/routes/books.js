/*
File Name: books.js
Student Name: Huyen Anh Phan
Student ID: 301216123
Web App Name: COMP229-W2020-MidTerm-301216123
*/

// modules required for routing
let express = require('express');
let router = express.Router();
let mongoose = require('mongoose');

// define the book model
let book = require('../models/books');

/* GET books List page. READ */
router.get('/', (req, res, next) => {
  // find all books in the books collection
  book.find( (err, books) => {
    if (err) {
      return console.error(err);
    }
    else {
      res.render('books/index', {
        title: 'Books',
        books: books
      });
    }
  });

});

//  GET the Book Details page in order to add a new Book
//router.get('/add',bookController.displayAddPage);
router.get('/add', (req, res, next) => {

    /*****************
     * ADD CODE HERE *
     *****************/
    res.render('books/details', {title:"Add",  books:''});

});
//router.post('/add',bookController.processAddPage)
// POST process the Book Details page and create a new Book - CREATE
router.post('/add', (req, res, next) => {

    /*****************
     * ADD CODE HERE *
     *****************/
    let newBook = book({
      "Title": req.body.title,
      "Description": req.body.description,
      "Author": req.body.author,
      "Price": req.body.price,
      "Genre": req.body.genre
    });
    book.create(newBook,(err,book)=>{
      if(err){
        console.log(err);
        res.end(err);
      }
      res.redirect('/books')
    });

});

// GET the Book Details page in order to edit an existing Book
//router.get('/:id',bookController.displayEditPage);
router.get('/:id', (req, res, next) => {

    /*****************
     * ADD CODE HERE *
     *****************/
    let id = req.params.id;
    book.findById(req.params.id,(err,bookEdit)=>{
      if(err){
        console.error(err);
      } else{
        res.render('books/details',{title:"Edit",page:'details',books: bookEdit});
      }
    });
});

// POST - process the information passed from the details form and update the document
//router.post('/:id',bookController.processEditPage);
router.post('/:id', (req, res, next) => {

    /*****************
     * ADD CODE HERE *
     *****************/
    let id = req.params.id
    console.log(req.body);

    let updateBook= book({
      "_id": id,
      "Title": req.body.title,
      "Description": req.body.description,
      "Price": req.body.price,
      "Author": req.body.author,
      "Genre":req.body.genre
    });

    book.updateOne({_id:id},updateBook,(err)=>{
      if(err){
        console.log(err);
        res.end(err);
      }else{
        res.redirect('/books');
      }
    });

});

// GET - process the delete by user id
//router.get('/delete/:id',bookController.performDelete);
router.get('/delete/:id', (req, res, next) => {

    /*****************
     * ADD CODE HERE *
     *****************/
    let id = req.params.id;
    book.remove({_id:id},(err)=>{
      if(err){
        console.log(err);
        res.end(err);

      }
      res.redirect('/books');
    });
});


module.exports = router;
