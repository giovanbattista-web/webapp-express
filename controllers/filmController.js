const connection = require('../data/db.js');

// METODO INDEX
const index = (req, res) => {
    connection.query("SELECT * FROM movies", (err, moviesResult) => {
        if (err) return res.status(500).json({ error: "Database query failed" + err });
        res.json(moviesResult);
    })
}

const show = (req, res) => {
    // RECUPERO L'id
    const { id } = req.params

    // QUERY PER IL RECUPERO DEL FILM AVENTE id RECUPERATO
    const movieSql = `
    SELECT movies.*, AVG(reviews.vote) AS average_vote
    FROM movies
    JOIN reviews ON movies.id= reviews.movie_id 
    WHERE movies.id=?
    GROUP BY  movies.id`;

    // QUERY PER IL RECUPERO DELLE RECENSIONI DEL FILM RECUPERATO, ABBIAMO UNA ONE TO MANY
    const reviewsSql = `
    SELECT * 
    FROM reviews
    WHERE movie_id = ? 
    `;

    // ESEGUO LA QUERY PER RECUPERARE IL FILM
    connection.query(movieSql, [id], (err, movieResult) => {
        if (err) return res.status(500).json({ error: "Database query failed: " + err });

        if (movieResult.length === 0 || movieResult[0].id === null) {
            return res.status(404).json({ error: 'Not found' }); // ERRORE INTERNO AL METODO DEL CONTROLLER,
            // AD ESEMPIO id = 6 DOVE ABBIAMO 5 ELEMENTI MENTRE L'ALTRO NOTFOUND E' RIFERITO ALLA ROTTA,
            // AD ESEMPIO SE DOVESSI SCRIVERE CIAOOO INVECE DI ROTTA CIAO
        }

        const movie = movieResult[0]; // DATO CHE movieResult E' UN ARRAY

        connection.query(reviewsSql, [id], (err, reviewsResult) => {
            if (err) return res.status(500).json({ error: "Database query failed " + err });

            // AGGIUNGO LE RECENSIONI AL FILM
            movie.reviews = reviewsResult; // ALLA PROPRIETA' reviews ANDIAMO AD ASSEGNARE LE RECENSIONI CHE ABBIAMO
            // TROVATO

            // VADO AD AGGIUNGERE LA MEDIA DELLE RECENSIONI PER IL SINGOLO LIBRO
            movie.average_vote = parseInt(movie.average_vote); // VADO A SOVRASCRIVERE IL VOTO CON UN INTERO

            res.json(movieResult);
        })
    })
}

module.exports = {
    index,
    show
};