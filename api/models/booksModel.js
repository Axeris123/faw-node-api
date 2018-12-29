const mongoose = require('mongoose');
const Schema = mongoose.Schema;


const BooksSchema = new Schema({
    name: {
        type: String,
        required: 'Enter name of the book'
    },
    author: {
        type: String,
    },
    description: {
        type: String,
    },
    created: {
        type: Date,
        default: Date.now
    },
});

module.exports = mongoose.model('Books', BooksSchema);
