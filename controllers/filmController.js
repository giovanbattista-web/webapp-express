const connection = require('../data/db');

const index = (req, res) => {
    connection.query("SELECT * FROM movies", (err, moviesResult) => {
        if (err) return res.status(500).json({ error: "Database query failed " + err });

        const movies = moviesResult.map((movie) => {
            return {
                ...movie, image: req.imagePath + movie.image
            }
        })
        res.json(movies);
    })
}

const show = (req, res) => {
    const { id } = req.params

    const movieSql = `
    SELECT M.*, ROUND(AVG(R.vote)) as average_vote 
    FROM movies M 
    LEFT JOIN reviews R ON R.movie_id = M.id
    WHERE M.id = ?`;

    const reviewSql = "SELECT * FROM reviews WHERE movie_id = ?";

    connection.query(movieSql, [id], (err, movieResult) => {
        if (err) return res.status(500).json({ error: "Database query failed " + err });

        if (movieResult.length === 0)
            return res.status(404).json({ error: 'Not found' });

        const movie = movieResult[0];

        movie.image = req.imagePath + movie.image;

        connection.query(reviewSql, [id], (err, reviewResult) => {
            if (err) return res.status(500).json({ error: "Database query failed " + err });

            movie.reviews = reviewResult;

            res.json({ ...movie, image: req.imagePath + movie.image });
        })
    })
}

module.exports = {
    index,
    show
};