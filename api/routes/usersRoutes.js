module.exports = (app) => {
    const userAuth = require('../../auth/authController');
    const middlewareToken = require('../../auth/verifyToken');

    // todoList Routes
    app.route('/register')
        .post(userAuth.createUser);

    app.route('/me')
        .get(middlewareToken, userAuth.getToken);

    app.route('/login')
        .post(userAuth.userLogin);

    app.route('/logout')
        .get(userAuth.logOut);
};
