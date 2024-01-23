const Users = require('../database/models/User');
const {User} = require('../database/models');

async function userLoggedMiddleware(req, res, next) {
    res.locals.isLogged = false;

    if (req.cookies && req.cookies.userEmail) {
        let emailInCookie = req.cookies.userEmail;

        let userFromCookie = await User.findOne({where:{email: emailInCookie}});
        
        if (userFromCookie) {
            userFromCookie.password = undefined;
            req.session.userLogged = {...userFromCookie};
        }
    }
    
    if (req.session.userLogged) {
        res.locals.isLogged = true;
        res.locals.userLogged = {...req.session.userLogged};

    }

    next();
}

module.exports = userLoggedMiddleware;