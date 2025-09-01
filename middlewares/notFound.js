function notFound(req, res, next) {
    res.status(404); // PER EXPRESS 404 NON E' UN ERRORE
    res.json({
        error: "Not Found",
        message: "Page Not Found"
    });
};

module.exports = notFound;