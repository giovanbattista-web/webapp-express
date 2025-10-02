const express = require('express');

const app = express();

const cors = require('cors');

const port = process.env.SERVER_PORT || 3000;

const movieRouter = require('./routers/movieRouter');

const errorsHandler = require('./middlewares/errorsHandler');
const notFound = require('./middlewares/notFound');
const imagePath = require('./middlewares/imagePath');

app.use(cors({ origin: process.env.FE_APP }));

app.use(imagePath);

app.use(express.static('public'));

app.use(express.json());

app.get("/", (req, res) => {
    res.send("Welcome to my cinema");
});

app.use("/api/films", movieRouter);

app.use(errorsHandler);
app.use(notFound);

app.listen(port, () => {
    console.log(`Server listening on port ${port}`);
});