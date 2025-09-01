function notFound(req, res, next) {
    res.status(404); // EXPRESS IL 404 NON LO CONSIDERA UN ERRORE
    res.json({
        error: "Not Found",
        message: "Page not found"
    });
};

module.exports = notFound;