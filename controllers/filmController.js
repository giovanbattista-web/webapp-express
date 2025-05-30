const connection = require('../data/db');

const index = (req, res) => {
    connection.query("SELECT * FROM movies", (err, movieResult) => {
        if (err) {
            return res.status(500).json({ error: "Database query failed " + err });
        }
        res.json(movieResult);
    });
};

const show = (req, res) => {
    const { id } = req.params;

    const movieSql = "SELECT * FROM movies WHERE id = ?";

    const reviewsSql =
        `SELECT *
    FROM reviews
    WHERE movie_id = ?;`

    connection.query(movieSql, [id], (err, movieResult) => {
        if (err) return res.status(500).json({ error: "Database query failed " + err });

        if (movieResult.length === 0 || movieResult[0].id === null)
            return res.status(404).json({ error: 'Not found' });

        const movie = movieResult[0];

        connection.query(reviewsSql, [id], (err, reviewsResult) => {
            if (err) return res.status(500).json({ error: "Database query failed " + err });

            movie.reviews = reviewsResult;

            res.json(movie);
        })
    });
};

module.exports = {
    index,
    show
};