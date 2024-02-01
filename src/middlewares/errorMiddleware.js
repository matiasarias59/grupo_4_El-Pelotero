function errorMiddleware  (req, res, next)  {
        const message = `Parece que esta página no existe`
        res.status(404).render('errorView', {message});
    
        next();

}

module.exports = errorMiddleware;