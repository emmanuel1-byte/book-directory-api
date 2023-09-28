/* Authentication Exports */
const authController = require('./auth.controller');
const main = authController.main;
const signup = authController.Register;
const signin = authController.Login;
const signout = authController.Logout;

/* Book Exports*/
const booksController = require('./books.controller');
const addBook = booksController.addBook;
const getBook = booksController.getBooks
const updateBook = booksController.updateBook;
const deleteBook = booksController.deleteBook



module.exports = {
    main : main,
    Signup : signup,
    signin : signin,
    signout : signout,
    addbook : addBook,
    getbook : getBook,
    updatebook : updateBook,
    deleteBook : deleteBook

}