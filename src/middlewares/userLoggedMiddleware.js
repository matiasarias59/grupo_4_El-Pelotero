const Users = require('../database/models/User');

function userLoggedMiddleware(req, res, next) {
    res.locals.isLogged = false;

    if (req.cookies && req.cookies.userEmail) {
        let emailInCookie = req.cookies.userEmail;

        let userFromCookie = User.findOne({where:{email: emailInCookie}});

        if (userFromCookie) {
            req.session.userLogged = userFromCookie;
        }
    }

    if (req.session.userLogged) {
        res.locals.isLogged = true;
        res.locals.userLogged = req.session.userLogged;
    }

    next();
}

module.exports = userLoggedMiddleware;