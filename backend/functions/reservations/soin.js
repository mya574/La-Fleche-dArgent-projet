//maya

const express = require('express');
const router = express.Router();
const db = require('../../db');

//je reserve le soin
router.post('/reserver-soin', (req, res) => {
    const { id_utilisateur, id_soin, date_reservation } = req.body;

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

        const queryReservation = `
            INSERT INTO reservation_soins (id_utilisateur, id_soin, nom_soin, prix_soin, date_reservation) 
            VALUES (?, ?, ?, ?, ?)
        `;
        db.query(queryReservation, [id_utilisateur, id_soin, nom_soin, prix_soin, date_reservation], (err, result) => {
            if (err) {
                console.error('Erreur lors de l\'ajout de la réservation :', err);
                res.status(500).send('Erreur serveur');
                return;
            }

            res.send({ message: 'Réservation effectuée avec succès', id_reservation: result.insertId });
        });
    });
});

// modifie la réservation de soin
router.post('/modifier-reservation-soin', (req, res) => {
    const { id_utilisateur, id_soin, date_reservation } = req.body;

    
    const queryCheckByUser = `
        SELECT * FROM reservation_soins 
        WHERE id_utilisateur = ?
    `;
    db.query(queryCheckByUser, [id_utilisateur], (err, results) => {
        if (err) {
            console.error('Erreur lors de la vérification par utilisateur :', err);
            res.status(500).send('Erreur serveur');
            return;
        }

        if (results.length === 0) {
            res.status(404).send('Aucune réservation trouvée pour cet utilisateur.');
            return;
        }

        // verifie si une réservation existe 
        const existingReservation = results.find(r => r.id_soin === id_soin);

        if (existingReservation) {
            // mise à jour de la date uniquement si le soin reste le même
            const queryUpdateDate = `
                UPDATE reservation_soins 
                SET date_reservation = ? 
                WHERE id_utilisateur = ? AND id_soin = ?
            `;
            db.query(queryUpdateDate, [date_reservation, id_utilisateur, id_soin], (err) => {
                if (err) {
                    console.error('Erreur lors de la mise à jour de la réservation :', err);
                    res.status(500).send('Erreur serveur');
                    return;
                }
                res.send({ message: 'Date de réservation modifiée avec succès.' });
            });
        } else {
            // mets a jour du soin et ses informations
            const queryNewSoin = 'SELECT nom_soin, prix_soin FROM soins WHERE id_soin = ?';
            db.query(queryNewSoin, [id_soin], (err, soinResults) => {
                if (err) {
                    console.error('Erreur lors de la récupération des informations du nouveau soin :', err);
                    res.status(500).send('Erreur serveur');
                    return;
                }

                if (soinResults.length === 0) {
                    res.status(404).send('Le soin spécifié est introuvable.');
                    return;
                }

                const { nom_soin, prix_soin } = soinResults[0];
                const queryUpdateSoin = `
                    UPDATE reservation_soins 
                    SET id_soin = ?, nom_soin = ?, prix_soin = ?, date_reservation = ? 
                    WHERE id_utilisateur = ?
                `;
                db.query(queryUpdateSoin, [id_soin, nom_soin, prix_soin, date_reservation, id_utilisateur], (err) => {
                    if (err) {
                        console.error('Erreur lors de la mise à jour de la réservation :', err);
                        res.status(500).send('Erreur serveur');
                        return;
                    }
                    res.send({ message: ' soin de la réservation modifiée avec succès.' });
                });
            });
        }
    });
});

// supprimer la reservation
router.delete('/supprimer-reservation-soin', (req, res) => {
    const { id_utilisateur, id_soin } = req.body;

    if (!id_utilisateur || !id_soin) {
        return res.status(400).send('Les champs id_utilisateur et id_soin sont requis.');
    }

    const queryDelete = `
        DELETE FROM reservation_soins 
        WHERE id_utilisateur = ? AND id_soin = ?
    `;
    db.query(queryDelete, [id_utilisateur, id_soin], (err, result) => {
        if (err) {
            console.error('Erreur lors de la suppression de la réservation :', err);
            return res.status(500).send('Erreur serveur');
        }

        if (result.affectedRows === 0) {
            return res.status(404).send('Aucune réservation trouvée pour cet utilisateur et ce soin.');
        }

        res.send({ message: 'Réservation supprimée avec succès.' });
    });
});

//récupérer toutes les réservations de soins
router.post('/get-all-res-soins', (req, res) => {
    const { id_utilisateur } = req.body;

    const query = 'SELECT * FROM reservation_soins WHERE id_utilisateur = ?';
    db.query(query, [id_utilisateur], (err, results) => {
        if (err) {
            console.error('Erreur lors de la récupération des réservations de soins :', err);
            return res.status(500).json({ message: 'Erreur serveur lors de la récupération des réservations de soins.' });
        }

        res.status(200).json({ reservations: results });
    });
});


module.exports = router;
