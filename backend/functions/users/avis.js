const express = require('express');
const router = express.Router();
const db = require('../../db'); 


router.post('/add-user', (req, res) => { //ajouter utilisateur
    const { contenu, positif} = req.body;

    const sql = 'INSERT INTO avis (id_utilisateur, contenu_avis, date_avis, positif, is_actif) VALUES (?, ?, ?, true , true)';
    db.query(sql, [contenu, positif], (err, result) => {
        if (err) {
            console.error('Erreur lors de l\'ajout de l\'utilisateur :', err);
            res.status(500).send('Erreur serveur');
            return;
        }
        res.send({ message: 'Utilisateur ajouté avec succès', id_utilisateur: result.insertId });
    });
});

router.post('/remove-user', (req, res) => { //supprimer utilisateur
    const { id_utilisateur } = req.body;

    const sql = 'DELETE FROM utilisateurs WHERE id_utilisateur = ?';
    db.query(sql, [id_utilisateur], (err, result) => {
        if (err) {
            console.error('Erreur lors de la suppression de lutilisateur :', err);
            res.status(500).send('Erreur serveur');
            return;
        }
        res.send({ message: 'Utilisateur supprime avec succès', id_utilisateur: result.insertId });
    });
});



module.exports = router;
