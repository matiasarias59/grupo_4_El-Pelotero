function checkMiddleware(req, res, next) {
    res.locals.userLogged = req.session.userLogged ? true : false;
    next();
}

module.exports = checkMiddleware;