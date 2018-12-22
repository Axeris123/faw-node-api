const mongoose = require('mongoose');
const uniqueValidator = require('mongoose-unique-validator');
const Schema = mongoose.Schema;


const UsersSchema = new Schema({
    email: {
        type: String,
        required: 'Please provide email',
        unique: true
    },
    password: String
});

UsersSchema.plugin(uniqueValidator, {message: 'Error, expected {PATH} to be unique.'});

module.exports = mongoose.model('Users', UsersSchema);