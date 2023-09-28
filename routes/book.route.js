const express = require('express');
const router = express.Router();
const index = require('../controller/index');
const addBook = index.addbook;
const getBooks = index.getbook;
const updateBook = index.updatebook;
const deleteBook = index.deleteBook

/* Book operations */
router.post('/api/books/addBook', addBook);

router.get('/api/books/getBooks', getBooks);

router.put('/api/books/updateBook/:id', updateBook);

router.delete('/api/books/deleteBook/:id', deleteBook)

module.exports = router;