const express = require('express');
const mysql = require('mysql');
const bodyParser = require('body-parser');

require('dotenv').config();

const app = express();

app.use(bodyParser.json()); // Middleware pour analyser les requêtes JSON

const db = mysql.createConnection({
    host: process.env.DATABASE_HOST,
    user: process.env.DATABASE_USER,
    password: process.env.DATABASE_PASSWORD,
    database: process.env.DATABASE_NAME
});

// Se connecter à la base de données
db.connect((err) => {
    if (err) {
        console.error('Erreur de connexion à la base de données :', err);
        return;
    }
    console.log('Connecté à la base de données MySQL');
});

// Endpoint pour ajouter des données dans une table
app.post('/add', (req, res) => {
    //console.log(req.body); 
    const { nom_utilisateur, prenom_utilisateur, email } = req.body;
    const sql = 'INSERT INTO utilisateurs (nom_utilisateur, prenom_utilisateur, email, is_admin) VALUES (?, ?, ?, true)';
    db.query(sql, [nom_utilisateur, prenom_utilisateur, email], (err, result) => {
        if (err) {
            console.error('Erreur lors de l\'ajout des données :', err);
            res.status(500).send('Erreur serveur');
            return;
        }
        res.send({ message: 'Données ajoutées avec succès', id: result.insertId });
    });
});


const port = process.env.PORT || 3000;

app.listen(port, () => {
    console.log(`Serveur démarré sur http://localhost:${port}`);
});
