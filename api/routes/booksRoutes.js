module.exports = (app) => {
    const books = require('../controllers/booksController');
    const middlewareToken = require('../../auth/verifyToken');

    // todoList Routes
    app.route('/books')
        .get(books.list_all_books)
        .post(middlewareToken, books.create_book);


    app.route('/books/:bookId')
        .get(books.read_book)
        .put(middlewareToken, books.update_book)
        .delete(middlewareToken, books.delete_book);

    app.route('/books/:bookId/review')
        .post(middlewareToken, books.post_review)
        .get(books.list_reviews_for_book);

};
