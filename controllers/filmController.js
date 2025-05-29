const connection = require('../data/db');

const index = (req, res) => {
    res.send("Elenco film");
};

const show = (req, res) => {
    res.send("Film con id " + req.params.id);
};

module.exports = {
    index,
    show
};