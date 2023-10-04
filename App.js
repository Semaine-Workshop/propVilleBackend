//imports
const config = require('./config.js');

const initRoles = require('./Controllers/RolesController.js');
const initUser = require('./Controllers/UserController.js');

const mysql = require("mysql");

const debug = config.debug || false;

// Database connection
if (debug) console.log("Connecting to database...");
const db = mysql.createConnection(config.database);
db.connect((err) => {
    if (err) {
        console.error("Error connecting to database: ");
        throw err
    };
    if (debug) console.log("Connected to database.");
});

initRoles(db);
initUser(db);
