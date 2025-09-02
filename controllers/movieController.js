const connection = require('../data/db');

// METODO INDEX
const index = (req, res) => {
    connection.query("SELECT * FROM movies", (err, response) => {
        if (err) return res.status(500).json({ error: "Database query failed" + err });

        const movies = response.map((movie) => {
            return {
                ...movie,
                image: req.imagePath + movie.image
            }
        })
        console.log(response, movies);
        res.json(movies);
    })
}

const show = (req, res) => {
    // RECUPERO L'id
    const id = req.params.id

    // QUERY PER IL RECUPERO DEL FILM AVENTE id RECUPERATO
    const movieSql = `
    SELECT movies.*, AVG(reviews.vote) AS vote
    FROM movies
    JOIN reviews ON movies.id = reviews.movie_id
    WHERE movies.id=?
    GROUP BY  movies.id`;

    // QUERY PER IL RECUPERO DELLE RECENSIONI DEL FILM RECUPERATO, ABBIAMO UNA ONE TO MANY
    const reviewsSql = `
    SELECT * 
    FROM reviews
    WHERE movie_id = ? 
    `;

    // ESEGUO LA QUERY PER RECUPERARE IL FILM
    connection.query(movieSql, [id], (err, response) => {
        if (err) return res.status(500).json({ error: "Database query failed: " + err });

        if (response.length === 0 || response[0].id === null) {
            return res.status(404).send({ error: 'Not found' }); // ERRORE INTERNO AL METODO DEL CONTROLLER,
            // AD ESEMPIO id = 6 DOVE ABBIAMO 5 ELEMENTI MENTRE L'ALTRO NOTFOUND E' RIFERITO ALLA ROTTA,
            // AD ESEMPIO SE DOVESSI SCRIVERE CIAOOO INVECE DI ROTTA CIAO
        }

        const movie = response[0]; // DATO CHE response E' UN ARRAY

        connection.query(reviewsSql, [id], (err, reviewsResult) => {
            if (err) return res.status(500).json({ error: "Database query failed " + err });

            // AGGIUNGO LE RECENSIONI AL FILM
            movie.reviews = reviewsResult; // ALLA PROPRIETA' reviews ANDIAMO AD ASSEGNARE LE RECENSIONI CHE ABBIAMO
            // TROVATO

            // VADO AD AGGIUNGERE LA MEDIA DELLE RECENSIONI PER IL SINGOLO LIBRO
            movie.average_vote = parseInt(movie.average_vote); // VADO A SOVRASCRIVERE IL VOTO CON UN INTERO

            res.json({ ...movie, image: req.imagePath + movie.image });
        })
    })
}

module.exports = {
    index,
    show
};