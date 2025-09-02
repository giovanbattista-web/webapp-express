// IMPORTO mysql2
const mysql = require('mysql2');

// CREO LA CONNESSIONE AL DB MA NON LA STO EFFETTUANDO 
const connection = mysql.createConnection({
    host: process.env.DB_HOST || "localhost",
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME
});

// EFFETTUO LA CONNESSIONE
connection.connect((err) => {
    if (err) {
        console.log("Error to connect MySql" + err);
    } else {
        console.log("Connected to mySql");
    }
});

// ESPORTO LA VARIABILE connection
module.exports = connection;