const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const BooksReviewsSchema = new Schema({
    review: {
        type: String,
        required: 'Enter review'
    },
    stars: {
        type: Number,
        required: 'Enter stars value'
    },
    author: {
        type: String,
        ref: 'Users',
        required: true
    },
    book: {
        type: String,
        ref: 'Books',
        required: true
    },
    created: {
        type: Date,
        default: Date.now
    },
});

module.exports = mongoose.model('BooksReviews', BooksReviewsSchema);
