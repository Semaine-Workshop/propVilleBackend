const config = require('../config.js');

const mysql = require('mysql');

const debug = config.debug || false;
const debugHard = false;

function initReports(db, app) {

    app.get('/get/Reports', (req, res) => {
        if (debug) console.log('GET /Reports');

        let query = 'SELECT * FROM reports';
        let params = [];

        query = mysql.format(query, params);

        db.query(query, (err, result) => {
            if (err) throw err;
            if (debugHard) console.log('Result: ', result);

            res.send(result);
        });
    });

    app.get('/get/Reports/id', (req, res) => {
        if (debug) console.log('GET /Reports/id');

        const idReports = req.query.idReports;

        let query = 'SELECT * FROM reports WHERE id = ?';
        let params = [idReports];

        query = mysql.format(query, params);

        db.query(query, (err, result) => {
            if (err) throw err;
            if (debugHard) console.log('Result: ', result);

            res.send(result);
        });
    });

    app.get('/get/Reports/idUser', (req, res) => {
        if (debug) console.log('GET /Reports/idUser');

        const idUser = req.query.idUser;

        let query = 'SELECT * FROM reports WHERE idUser = ?';
        let params = [idUser];

        query = mysql.format(query, params);

        db.query(query, (err, result) => {
            if (err) throw err;
            if (debugHard) console.log('Result: ', result);

            res.send(result);
        });
    });

    app.get('/get/Reports/date', (req, res) => {
        if (debug) console.log('GET /Reports/Date');

        const Date = req.query.Date;

        let query = 'SELECT * FROM reports WHERE Date = ?';
        let params = [Date];

        query = mysql.format(query, params);

        db.query(query, (err, result) => {
            if (err) throw err;
            if (debugHard) console.log('Result: ', result);

            res.send(result);
        });
    });

    app.post('/post/Reports', (req, res) => {
        if (debug) console.log('POST /Reports');

        const newReport = req.body;

        if (newReport.idUser == undefined || newReport.info == undefined || newReport.localisation == undefined) {
            res.send('Error: Missing parameters');
            return;
        }

        const reportToInsert = {
            idUser: newReport.idUser,
            Date: new Date(),
            info: newReport.info,
            localisation: newReport.localisation,
            status: false,
        };

        const query = 'INSERT INTO reports SET ?';

        db.query(query, reportToInsert, (err, result) => {
            if (err) throw err;

            res.send(result);
        });
    });
}

module.exports = initReports;