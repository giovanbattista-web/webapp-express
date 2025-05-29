const mysql = require('mysql2');

const connection = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "root",
    database: "db_movies"
});

connection.connect((err) => {
    if (err) {
        console.log("Error to connect to MySql " + err);
    }
    else {
        console.log("Connected to my MySql");
    }
});

module.exports = connection;