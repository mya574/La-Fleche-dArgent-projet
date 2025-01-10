const express = require('express');
const router = express.Router();
const db = require('../../db');

// Route pour réserver ou modifier une réservation
router.post('/reserver-ou-modifier-chambre', (req, res) => {
    const { id_reservation_chambre, id_utilisateur, id_chambre, date_debut, date_fin } = req.body;
    console.log(req.body)

    if (!id_utilisateur || !id_chambre || !date_debut || !date_fin) {
        return res.status(400).json({ message: 'Tous les champs sont requis.' });
    }

    // Vérification des informations de la chambre choisie
    const queryChambre = 'SELECT nom_chambre, prix_chambre FROM chambres WHERE id_chambre = ?';
    db.query(queryChambre, [id_chambre], (err, results) => {
        if (err) {
            console.error('Erreur lors de la récupération des informations de la chambre :', err);
            return res.status(500).json({ message: 'Erreur serveur lors de la récupération des informations de la chambre.' });
        }

        if (results.length === 0) {
            return res.status(404).json({ message: 'La chambre demandée est introuvable.' });
        }

        const { nom_chambre, prix_chambre } = results[0];

        // Vérification de la disponibilité de la chambre
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
                return res.status(500).json({ message: 'Erreur serveur lors de la vérification des disponibilités.' });
            }

            if (conflictingReservations.length > 0) {
                return res.status(400).json({ message: 'La chambre est déjà réservée pour cette période.' });
            }

            if (id_reservation_chambre) {
                // Mise à jour d'une réservation existante
                const updateReservationQuery = `
                    UPDATE reservation_chambres
                    SET id_chambre = ?, nom_chambre = ?, prix_chambre = ?, date_debut = ?, date_fin = ?
                    WHERE id_reservation_chambre = ? AND id_utilisateur = ?
                `;
                db.query(updateReservationQuery, [id_chambre, nom_chambre, prix_chambre, date_debut, date_fin, id_reservation_chambre, id_utilisateur], (err, result) => {
                    if (err) {
                        console.error('Erreur lors de la mise à jour de la réservation :', err);
                        return res.status(500).json({ message: 'Erreur serveur lors de la mise à jour de la réservation.' });
                    }

                    if (result.affectedRows === 0) {
                        return res.status(404).json({ message: 'Réservation introuvable ou non modifiable par cet utilisateur.' });
                    }

                    return res.status(200).json({ message: 'Votre réservation a été mise à jour avec succès.' });
                });
            } else {
                // Création d'une nouvelle réservation
                const insertReservationQuery = `
                    INSERT INTO reservation_chambres (id_utilisateur, id_chambre, nom_chambre, prix_chambre, date_debut, date_fin)
                    VALUES (?, ?, ?, ?, ?, ?)
                `;
                db.query(insertReservationQuery, [id_utilisateur, id_chambre, nom_chambre, prix_chambre, date_debut, date_fin], (err, result) => {
                    if (err) {
                        console.error('Erreur lors de l\'ajout de la réservation :', err);
                        return res.status(500).json({ message: 'Erreur serveur lors de l\'ajout de la réservation.' });
                    }

                    return res.status(200).json({
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

// Route pour récupérer toutes les réservations de chambres
router.post('/get-all-res-chambres', (req, res) => {
    const { id_utilisateur } = req.body;
   // console.log(req.body)

    const query = 'SELECT * FROM reservation_chambres WHERE id_utilisateur = ?';
    db.query(query, [id_utilisateur], (err, results) => {
        if (err) {
            console.error('Erreur lors de la récupération des réservations de chambres :', err);
            return res.status(500).json({ message: 'Erreur serveur lors de la récupération des réservations de chambres.' });
        }

        res.status(200).json({ reservations: results });
    });
});


module.exports = router;
