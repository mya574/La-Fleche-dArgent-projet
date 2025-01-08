const express = require('express');
const router = express.Router();
const db = require('../../db');

// Route pour réserver ou modifier une réservation
router.post('/reserver-ou-modifier-chambre', (req, res) => {
    const { id_reservation_chambre, id_utilisateur, id_chambre, date_debut, date_fin } = req.body;

    // Récupère les informations de la chambre choisie
    const queryChambre = 'SELECT nom_chambre, prix_chambre FROM chambres WHERE id_chambre = ?';
    db.query(queryChambre, [id_chambre], (err, results) => {
        if (err) {
            console.error('Erreur lors de la récupération des informations de la chambre :', err);
            res.status(500).send('Erreur serveur');
            return;
        }

        if (results.length === 0) {
            res.status(404).send('La chambre demandée est introuvable.');
            return;
        }

        const { nom_chambre, prix_chambre } = results[0];

        // Vérifie la disponibilité de la chambre pour les nouvelles dates
        const checkAvailabilityQuery = `
            SELECT * 
            FROM reservation_chambres 
            WHERE id_chambre = ? 
            AND id_reservation_chambre != ? 
            AND (
                (date_debut <= ? AND date_fin >= ?) OR 
                (date_debut <= ? AND date_fin >= ?)
            )
        `;
        db.query(checkAvailabilityQuery, [id_chambre, id_reservation_chambre || 0, date_debut, date_debut, date_fin, date_fin], (err, conflictingReservations) => {
            if (err) {
                console.error('Erreur lors de la vérification des disponibilités :', err);
                res.status(500).send('Erreur serveur');
                return;
            }

            if (conflictingReservations.length > 0) {
                res.status(400).send('La chambre est déjà réservée pour cette période.');
                return;
            }

            if (id_reservation_chambre) {
                // Si l'utilisateur modifie une réservation existante
                const updateReservationQuery = `
                    UPDATE reservation_chambres
                    SET id_chambre = ?, nom_chambre = ?, prix_chambre = ?, date_debut = ?, date_fin = ?
                    WHERE id_reservation_chambre = ? AND id_utilisateur = ?
                `;
                db.query(updateReservationQuery, [id_chambre, nom_chambre, prix_chambre, date_debut, date_fin, id_reservation_chambre, id_utilisateur], (err, result) => {
                    if (err) {
                        console.error('Erreur lors de la mise à jour de la réservation :', err);
                        res.status(500).send('Erreur serveur');
                        return;
                    }

                    if (result.affectedRows === 0) {
                        res.status(404).send('Réservation introuvable ou non modifiable par cet utilisateur.');
                        return;
                    }

                    res.send({ message: 'Votre réservation a été mise à jour avec succès.' });
                });
            } else {
                // Si l'utilisateur effectue une nouvelle réservation
                const insertReservationQuery = `
                    INSERT INTO reservation_chambres (id_utilisateur, id_chambre, nom_chambre, prix_chambre, date_debut, date_fin)
                    VALUES (?, ?, ?, ?, ?, ?)
                `;
                db.query(insertReservationQuery, [id_utilisateur, id_chambre, nom_chambre, prix_chambre, date_debut, date_fin], (err, result) => {
                    if (err) {
                        console.error('Erreur lors de l\'ajout de la réservation :', err);
                        res.status(500).send('Erreur serveur');
                        return;
                    }

                    res.send({
                        message: 'Réservation de chambre effectuée avec succès.',
                        id_reservation_chambre: result.insertId,
                    });
                });
            }
        });
    });
});

// Route pour supprimer une réservation
router.delete('/supprimer-reservation', (req, res) => {
    const { id_reservation_chambre, id_utilisateur } = req.body;

    const deleteReservationQuery = `
        DELETE FROM reservation_chambres
        WHERE id_reservation_chambre = ? AND id_utilisateur = ?
    `;
    db.query(deleteReservationQuery, [id_reservation_chambre, id_utilisateur], (err, result) => {
        if (err) {
            console.error('Erreur lors de la suppression de la réservation :', err);
            res.status(500).send('Erreur serveur');
            return;
        }

        if (result.affectedRows === 0) {
            res.status(404).send('Réservation introuvable ou non supprimable par cet utilisateur.');
            return;
        }

        res.send({ message: 'Votre réservation a été supprimée avec succès.' });
    });
});

module.exports = router;
