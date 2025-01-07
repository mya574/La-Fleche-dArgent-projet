const express = require('express');
const router = express.Router();
const db = require('../../db'); 

router.post('/reserver-soin', (req, res) => {//reserver un soin 
    const { id_utilisateur, id_soin } = req.body;

    const querySoin = 'SELECT nom_soin, prix_soin FROM soins WHERE id_soin = ?';
    db.query(querySoin, [id_soin], (err, results) => {
        if (err) {
            console.error('Erreur lors de la récupération du soin :', err);
            res.status(500).send('Erreur serveur');
            return;
        }

        if (results.length === 0) {
            res.status(404).send('Soin non trouvé');
            return;
        }

        const { nom_soin, prix_soin } = results[0];

        const queryReservation = 'INSERT INTO reservation_soins (id_utilisateur, id_soin, nom_soin, prix_soin) VALUES (?, ?, ?, ?)';
        db.query(queryReservation, [id_utilisateur, id_soin, nom_soin, prix_soin], (err, result) => {
            if (err) {
                console.error('Erreur lors de l\'ajout de la réservation :', err);
                res.status(500).send('Erreur serveur');
                return;
            }

            res.send({ message: 'Réservation effectuée avec succès', id_reservation: result.insertId });
        });
    });
});

module.exports = router;
