const mongoose = require('mongoose');
const book = mongoose.model('Books');
const bookReview = mongoose.model('BooksReviews');

exports.list_all_books = (req, res) => {
    book.find({}, (err, book) => {
        if (err)
            res.send(err);
        res.json(book);
    });
};


exports.create_book = (req, res) => {
    const new_book = new book(req.body);
    new_book.save((err, book) => {
        if (err)
            res.send(err);
        res.json(book);
    });
};

exports.post_review = (req, res) => {
    bookReview.create({
            review: req.body.review,
            book: req.params.bookId,
            author: req.userId
        },
        (err, review) => {
            if (err) return res.status(400).send("There was a problem posting review.");
            res.status(201).send({review: review});
        });
};


exports.list_reviews_for_book = (req, res) => {
    bookReview.find({book: req.params.bookId}).populate('book').populate({
        path: 'author',
        'select': 'email'
    }).exec((err, reviews) => {
        if (err)
            res.send(err);
        res.json(reviews);
    });
};


exports.read_book = (req, res) => {
    book.findById(req.params.bookId, (err, book) => {
        if (err)
            res.send(err);
        res.json(book);
    });
};


exports.update_book = (req, res) => {
    book.findOneAndUpdate({_id: req.params.bookId}, req.body, {new: true}, (err, book) => {
        if (err)
            res.send(err);
        res.json(book);
    });
};


exports.delete_book = (req, res) => {
    book.remove({
        _id: req.params.bookId
    }, (err, book) => {
        if (err)
            res.send(err);
        res.json({message: 'book successfully deleted'});
    });


};