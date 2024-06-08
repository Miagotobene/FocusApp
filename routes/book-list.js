const express = require('express');
const router = express.Router();
const Book = require('../models/books')


// get book app dashboard
router.get('/', async (req,res) => {
    const response = await Book.find({});
    // console.log(response);
    res.render('books/book-list', {data: response})
})

// // Get : add a book
router.get('/add-book', async (req,res) => {
    res.render('books/add-book')
})

// Post a book: create a book
router.post('/', async (req,res) => {
    try {
        const data = req.params.id;
        console.log(data);
        const newBook = new Book(req.body, req.params.id);
        const response = await newBook.save();
        // res.send(response);
        res.redirect('/api/books') 
        // redirect to the dashboard

    } catch (error) {
        console.log(error)
        
    }
   
})

// delete a book
router.get('/delete/:id', async (req,res) => {
    const id = req.params.id;
    // const response = await Book.deleteOne({id})
    try {
     await Book.deleteOne(
        {_id: req.params.id.trim()}
      )
      .where(req.user.id);
      res.redirect("/dashboard")
      console.log('task is deleted')
    } catch (error) {
        console.log(error);
      }
    // res.redirect('/api/books')
    // res.send(id)

    // res.render('books/book-list', {data: response})
})


module.exports = router;