'use strict';
// AuthController.js
const mongoose = require('mongoose');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');

const User = mongoose.model('Users');
const salt = 'WRbzwlS5Zrfu44Hca77z';

exports.createUser = (req, res) => {
    const hashedPassword = bcrypt.hashSync(req.body.password, 8);

    User.create({
            email: req.body.email,
            password: hashedPassword
        },
        (err, user) => {
            console.log(err);
            if (err) return res.status(400).send("There was a problem registering the user.");

            let token = jwt.sign({id: user._id, email: user.email}, salt, {
                expiresIn: 86400 // expires in 24 hours
            });

            res.status(200).send({auth: true, token: token, status: 200, message: 'User created!'});
        });

};


exports.getToken = (req, res, next) => {
    const token = req.headers['authorization'].split(" ")[1];

    if (!token) return res.status(401).send({auth: false, message: 'No token provided, provide a user token.'});

    jwt.verify(token, salt, (err, decoded) => {
        if (err) return res.status(500).send({auth: false, message: 'Failed to authenticate token.'});

        User.findById(decoded.id, {password: 0}, (err, retrieved_user) => {
            if (err) {
                return res.status(500).send('User was not found!');
            }
            if (!retrieved_user)
                return res.status(404).send("No user found.");
            res.status(200).send(retrieved_user);
            //    next(retrieved_user); // add this line
        });
    });
};

exports.userLogin = (req, res) => {
    User.findOne({email: req.body.email}, (err, found_user) => {
        if (err) return res.status(500).send('Error on the server.');
        if (!found_user) return res.status(404).send('No user found.');


        const passwordIsValid = bcrypt.compareSync(req.body.password, found_user.password);
        if (!passwordIsValid)
            return res.status(401).send({
                auth: false,
                token: null,
                status: 401,
                message: 'Incorrect Username of Password'
            });

        const token = jwt.sign({id: found_user._id, email: found_user.email}, salt, {
            expiresIn: 86400
        });

        res.status(200).send({auth: true, token: token, id: found_user.id, message: 'Login successful!'});
    });
};

exports.logOut = (req, res) => {
    res.status(200).send({auth: false, token: null});
};
