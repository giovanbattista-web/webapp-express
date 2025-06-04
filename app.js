const express = require('express');

const app = express();

const imagePathMiddleware = require('./imagePath');

app.use(express.static('public'));

app.use(express.json());

app.use(imagePathMiddleware);

const cors = require('cors');

const port = process.env.SERVER_PORT || 3000;

app.use(cors({ origin: process.env.FE_APP }));

const filmRouter = require('./routers/film');

app.get("/", (req, res) => {
    // console.log("Server dei miei film");
    res.send("Benvenuto nel mio cinema")
});

app.use("/films", filmRouter);

app.listen(port, () => {
    console.log(`Server in ascolto sulla porta ${port}`);
})