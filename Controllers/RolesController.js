const config = require("../config.js");

const mysql = require("mysql");

const debug = config.debug || false;
const debugHard = false;

function initRoles(db, app) {

    app.get("/get/Roles", (req, res) => {
        
        if (debug) {
            console.log("GET /roles");
        }

        let query = "SELECT * FROM roles";
        let params = [];

        query = mysql.format(query, params);

        db.query(query, (err, result) => {
            if (err) throw err;
            if (debugHard) console.log("Result: ", result);

            res.send(result);
        });
    });

}


module.exports = initRoles;