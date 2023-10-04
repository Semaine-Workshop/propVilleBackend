//imports
const config = require('./config.js');

const initRoles = require('./Controllers/RolesController.js');
const initUser = require('./Controllers/UserController.js');

const mysql = require("mysql");
const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");

const app = express();
app.use(cors());
app.use(bodyParser.json());

const debug = config.debug || false;

// Database connection
if (debug) console.log("Connecting to database...");
const db = mysql.createConnection(config.database);
db.connect((err) => {
    if (err) {
        console.error("Error connecting to database: ");
        throw err
    };
    console.log("Connected to database.");
});


initRoles(db, app);
initUser(db, app);

const PORT = config.port || 4201;
app.listen(PORT, () => {
  console.log(`Serveur démarré sur le port ${PORT}`);
});

