const express = require('express');
const router = express.Router();
const userHandler = require('../../../controller/user');
const authHandler = require('../../../controller/auth');

/* Authentication */
router.get('/', authHandler.main);

router.post('/api/v1/books/login',  authHandler.Login);

router.post('/api/v1/books/signup', authHandler.Register);

router.post('/api/v1/books/logout', authHandler.Logout);



/* Book operations */
router.get('/api/v1/books/findBooks/:id', userHandler.findbook);

router.post('/api/v1/books/addBook', userHandler.addBook);

router.get('/api/v1/books/getBooks', userHandler.getBooks);

router.put('/api/v1/books/updateBook/:id', userHandler.updateBook);

router.delete('/api/v1/books/deleteBook/:id', userHandler.deleteBook)

module.exports = router;