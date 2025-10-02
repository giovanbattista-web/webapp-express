const connection = require('../data/db');

const index = (req, res) => {
    connection.query("SELECT * FROM movies", (err, response) => {
        if (err) return res.status(500).json({ error: "Database query failed" + err });

        const movies = response.map((movie) => {
            return {
                ...movie,
                image: req.imagePath + (req.imagePath.endsWith('/') ? '' : '/') + movie.image
            }
        })
        console.log(response, movies);
        res.json(movies);
    })
}

const show = (req, res) => {
    const id = req.params.id

    const movieSql = `
    SELECT movies.*, AVG(reviews.vote) AS vote
    FROM movies
    JOIN reviews ON movies.id = reviews.movie_id
    WHERE movies.id=?
    GROUP BY  movies.id`;

    const reviewsSql = `
    SELECT * 
    FROM reviews
    WHERE movie_id = ? 
    `;

    connection.query(movieSql, [id], (err, response) => {
        if (err) return res.status(500).json({ error: "Database query failed: " + err });

        if (response.length === 0 || response[0].id === null) {
            return res.status(404).send({ error: 'Not found' });
        }

        const movie = response[0];

        connection.query(reviewsSql, [id], (err, reviewsResult) => {
            if (err) return res.status(500).json({ error: "Database query failed " + err });

            movie.reviews = reviewsResult;

            movie.average_vote = parseInt(movie.average_vote);

            res.json({
                ...movie,
                image: req.imagePath + (req.imagePath.endsWith('/') ? '' : '/') + movie.image
            });
        })
    })
}

const storeReview = (req, res) => {
    const { id } = req.params;

    const { name, vote, text } = req.body;

    const sql = " INSERT INTO reviews(movie_id,name,vote,text) VALUES(?,?,?,?)";

    connection.query(sql, [id, name, vote, text], (err, response) => {
        if (err) return res.status(500).json({ error: "Database query failed" });

        res.status(201).json({ message: "Review added" });
    });
};

module.exports = {
    index,
    show,
    storeReview
};