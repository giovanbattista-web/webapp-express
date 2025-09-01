function errorsHandler(err, req, res, next) { // req E next NON ABBIAMO BISOGNO IN QUESTO CASO 
    res.status(500);
    res.json({
        error: err.message
    });
};

module.exports = errorsHandler;