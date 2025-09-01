// IMPORTO EXPRESS
const express = require('express');

// INIZIALIZZO LA VARIABILE app CON IL METODO EXPRESS()
const app = express();

// IMPORTO IL PACCHETTO CORS
const cors = require('cors');

const port = process.env.SERVER_PORT || 3000;

// IMPORTO IL ROUTER
const moviesRouter = require('./routers/filmRouter.js');

// IMPORTO I CUSTOM MIDDLEWARE
const errorsHandler = require('./middlewares/errorsHandler.js');
const notFound = require('./middlewares/notFound.js');

// USO IL MIDDLEWARE PER IL CORS OVVERO UN OGGETTO CHE HA UNA COPPIA PROPRIETA' : VALORE 
// E' EXPRESS CHE DEVE ACCETTARE LE RICHIESTE 
app.use(cors({ origin: process.env.FE_APP }));

// USO IL MIDDLEWARE PER GLI ASSET STATICI
app.use(express.static('public'));

// USO IL MIDDLEWARE PER IL PARSINT DEL BODY DELLE RICHIESTE 
app.use(express.json());

// DEFINISCO UN ENTRY POINT
app.get("/", (req, res) => {
    res.send("Welcome to my cinema");
});

// UTILIZZO IL ROUTER ANDANDO A DEFINIRE IL GRUPPO DI ROTTE
app.use("/api/films", moviesRouter);

//UTILIZZO DEI MIDDLEWARES
app.use(errorsHandler);
app.use(notFound);

app.use(cors({
    origin: process.env.FE_APP
}));

// SERVER IN ASCOLTO SULLA PORTA 3000
app.listen(port, () => {
    console.log(`Server listening on port ${port}`);
});