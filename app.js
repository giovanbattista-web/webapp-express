const express = require('express');
const app = express();

const cors = require('cors');

const port = process.env.SERVER_PORT || 3000;

filmRouter = require('./routers/film');

app.get("/", (req, res) => {
    console.log("Server dei miei film");
    res.send("Benvenuto nel mio cinema")
});

app.use("/films", filmRouter);

app.listen(port, () => {
    console.log(`Server in ascolto sulla porta ${port}`);
})