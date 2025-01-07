const express = require('express');
const router = express.Router();
const db = require('../../db'); 


router.post('/add-user', (req, res) => {
    const { nom, prenom, email } = req.body;

    const sql = 'INSERT INTO utilisateurs (nom_utilisateur, prenom_utilisateur, email_utilisateur, is_admin) VALUES (?, ?, ?, false)';
    db.query(sql, [nom, prenom, email], (err, result) => {
        if (err) {
            console.error('Erreur lors de l\'ajout de l\'utilisateur :', err);
            res.status(500).send('Erreur serveur');
            return;
        }
        res.send({ message: 'Utilisateur ajouté avec succès', id_utilisateur: result.insertId });
    });
});

module.exports = router;
