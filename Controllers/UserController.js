const config = require("../config.js");

const mysql = require("mysql");
const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");

const app = express();
app.use(cors());
app.use(bodyParser.json());

const debug = config.debug || false;
const debugHard = false;

function initUser(db) {

    app.get("/get/Users", (req, res) => {
        if (debug) console.log("GET /user");

        let query = "SELECT * FROM user";
        let params = [];

        query = mysql.format(query, params);

        db.query(query, (err, result) => {
            if (err) throw err;
            if (debugHard) console.log("Result: ", result);

            res.send(result);
        });
    });

    app.get("/get/user/id", (req, res) => {
        if (debug) console.log("GET /user/id");

        const idUser = req.query.idUser;

        let query = "SELECT * FROM user WHERE id = ?";
        let params = [idUser];

        query = mysql.format(query, params);

        db.query(query, (err, result) => {
            if (err) throw err;
            if (debugHard) console.log("Result: ", result);

            res.send(result);
        });
    });

    app.get("/get/user/email", (req, res) => {
        if (debug) console.log("GET /user/email");

        const emailUser = req.query.emailUser;

        let query = "SELECT * FROM user WHERE email = ?";
        let params = [emailUser];

        query = mysql.format(query, params);

        db.query(query, (err, result) => {
            if (err) throw err;
            if (debugHard) console.log("Result: ", result);

            res.send(result);
        });
    });

    app.get("/get/user/phone", (req, res) => {
        if (debug) console.log("GET /user/phone");

        const phoneUser = req.query.phoneUser;

        let query = "SELECT * FROM user WHERE phone = ?";
        let params = [phoneUser];

        query = mysql.format(query, params);

        db.query(query, (err, result) => {
            if (err) throw err;
            if (debugHard) console.log("Result: ", result);

            res.send(result);
        });
    });

    app.post("/post/user/", async (req, res) => {
        if (debug) console.log("POST /user");
    
        const newUser = req.body;
    
        if (newUser.password !== newUser.password2) {
            res.send("Les mots de passe ne correspondent pas.");
            return;
        }
    
        if (newUser.email === "" || newUser.password === "" || newUser.nom === "" || newUser.prenom === "" || newUser.phone === "") {
            res.send("Veuillez remplir tous les champs obligatoires.");
            return;
        }
    
        // Ajouter des valeurs par défaut
        const userToInsert = {
            id: null, // Laisser la base de données générer l'ID
            nom: newUser.nom,
            prenom: newUser.prenom,
            points: 0, // Valeur par défaut
            role: newUser.role || "user", // Utilisateur par défaut, ajuste selon tes besoins
            cdate: new Date(), // Date actuelle
            email: newUser.email,
            password: newUser.password,
            phone: newUser.phone,
        };
    
        try {
            // Check if user already exists
            const emailExists = await checkUserExists("email", userToInsert.email);
            const phoneExists = await checkUserExists("phone", userToInsert.phone);
    
            if (emailExists || phoneExists) {
                res.send("Un utilisateur avec cette adresse email ou ce numéro de téléphone existe déjà.");
                return;
            }
    
            // Si l'utilisateur n'existe pas, effectue l'insertion
            const query = "INSERT INTO user SET ?";
            db.query(query, userToInsert, (err, result) => {
                if (err) {
                    console.error("Erreur lors de l'insertion de l'utilisateur :", err);
                    res.status(500).send("Erreur lors de la création de l'utilisateur.");
                    return;
                }
    
                if (debug) console.log("Utilisateur inséré avec succès. ID :", result.insertId);
    
                res.send("Utilisateur créé avec succès !");
            });
        } catch (error) {
            console.error("Erreur lors de la création de l'utilisateur :", error);
            res.status(500).send("Erreur lors de la création de l'utilisateur.");
        }
    });
    
    // Fonction pour vérifier si l'utilisateur existe déjà
    function checkUserExists(field, value) {
        return new Promise((resolve, reject) => {
            const query = `SELECT * FROM user WHERE ${field} = ?`;
            const params = [value];
    
            db.query(query, params, (err, result) => {
                if (err) {
                    console.error(`Erreur lors de la vérification de l'existence de l'utilisateur (${field}):`, err);
                    reject(err);
                    return;
                }
    
                resolve(result.length > 0);
            });
        });
    }

    app.delete("/delete/user/id", (req, res) => {
        if (debug) console.log("DELETE /user/id");

        const idUser = req.query.idUser;

        let query = "DELETE FROM user WHERE id = ?";
        let params = [idUser];

        query = mysql.format(query, params);

        db.query(query, (err, result) => {
            if (err) throw err;
            if (debugHard) console.log("Result: ", result);

            res.send("Utilisateur supprimé avec succès !");
        });
    });
}

module.exports = initUser;