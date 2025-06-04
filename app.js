const express = require('express');

const app = express();

const imagePathMiddleware = require('./imagePath');

app.use(imagePathMiddleware);

const router = require('./routers/filmRouter');

const cors = require('cors');

const port = process.env.SERVER_PORT || 3000;

app.use(cors({ origin: process.env.FE_APP }));

app.use(express.static('public'));

app.use(express.json());

app.get("/", (req, res) => {
    res.send("Benvenuto nel mio cinema")
});

app.use("/films", router);

app.listen(port, () => {
    console.log(`Server in ascolto sulla porta ${port}`);
})