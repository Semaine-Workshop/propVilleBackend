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

    app.get('/get/Reports/Date', (req, res) => {
        if (debug) console.log('GET /Reports/Date');

        const Date = req.query.Date;

        let query = 'SELECT * FROM reports WHERE date = ?';
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

        const idUser = req.body.idUser;
        const Date = req.body.Date;

        let query = 'INSERT INTO reports (idUser, date) VALUES (?, ?)';
        let params = [idUser, Date];

        query = mysql.format(query, params);

        db.query(query, (err, result) => {
            if (err) throw err;

            res.send(result);
        });
    });
}

module.exports = initReports;