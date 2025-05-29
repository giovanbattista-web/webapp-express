const connection = require('../data/db');

const index = (req, res) => {
    const sql = "SELECT * FROM movies";
    connection.query(sql, (err, results) => {
        if (err) {
            return res.status(500).json({ error: "Database query failed" });
        }

        // console.log(results);
        res.json(results);

    });
};

const show = (req, res) => {
    res.send("Film con id " + req.params.id);
};

module.exports = {
    index,
    show
};