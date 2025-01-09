const express = require('express');
const router = express.Router();
const db = require('../../db');
 
// Route pour ajouter ou modifier une réservation
router.post('/reserve', (req, res) => {
    const { id_utilisateur, nombre_couverts, date_reservation } = req.body;
 
    // Vérifie si l'utilisateur a déjà réservé pour cette date
    const userReservationCheckSql = `
        SELECT *
        FROM reservation_restaurant
        WHERE id_utilisateur = ? AND date_reservation = ?
    `;
    db.query(userReservationCheckSql, [id_utilisateur, date_reservation], (err, existingReservations) => {
        if (err) {
            console.error('Erreur lors de la vérification des réservations utilisateur :', err);
            res.status(500).send('Erreur serveur');
            return;
        }
 
        if (existingReservations.length > 0) {
            const existingReservation = existingReservations[0];
 
            // Cas 1 : Si le nombre de couverts est identique
            if (existingReservation.nombre_couverts === nombre_couverts) {
                res.status(400).send('Vous avez déjà réservé à cette date avec ce nombre de couverts.');
                return;
            }
 
            // Cas 2 : Si le nombre de couverts a été modifié
            const checkAvailabilitySql = `
                SELECT
                    restaurant.nombre_couverts - IFNULL(SUM(reservation_restaurant.nombre_couverts), 0) AS couverts_disponibles
                FROM restaurant
                LEFT JOIN reservation_restaurant ON restaurant.date = reservation_restaurant.date_reservation
                WHERE restaurant.date = ?
                GROUP BY restaurant.nombre_couverts
            `;
            db.query(checkAvailabilitySql, [date_reservation], (err, result) => {
                if (err) {
                    console.error('Erreur lors de la vérification des disponibilités :', err);
                    res.status(500).send('Erreur serveur');
                    return;
                }
 
                const couvertsDisponibles = result.length > 0 ? result[0].couverts_disponibles + existingReservation.nombre_couverts : 0;
 
                if (nombre_couverts > couvertsDisponibles) {
                    res.status(400).send('Pas assez de couverts disponibles pour cette date.');
                    return;
                }
 
                // Met à jour la réservation avec les nouvelles informations
                const updateReservationSql = `
                    UPDATE reservation_restaurant
                    SET nombre_couverts = ?
                    WHERE id_utilisateur = ? AND date_reservation = ?
                `;
                db.query(updateReservationSql, [nombre_couverts, id_utilisateur, date_reservation], (err) => {
                    if (err) {
                        console.error('Erreur lors de la mise à jour de la réservation :', err);
                        res.status(500).send('Erreur serveur');
                        return;
                    }
 
                    res.send({
                        message: 'Votre réservation a été modifiée avec succès.',
                    });
                });
            });
 
            return;
        }
 
        // Cas 3 : Nouvelle réservation
        const checkAvailabilitySql = `
            SELECT
                restaurant.nombre_couverts - IFNULL(SUM(reservation_restaurant.nombre_couverts), 0) AS couverts_disponibles
            FROM restaurant
            LEFT JOIN reservation_restaurant ON restaurant.date = reservation_restaurant.date_reservation
            WHERE restaurant.date = ?
            GROUP BY restaurant.nombre_couverts
        `;
        db.query(checkAvailabilitySql, [date_reservation], (err, result) => {
            if (err) {
                console.error('Erreur lors de la vérification des disponibilités :', err);
                res.status(500).send('Erreur serveur');
                return;
            }
 
            const couvertsDisponibles = result.length > 0 ? result[0].couverts_disponibles : 0;
 
            if (nombre_couverts > couvertsDisponibles) {
                res.status(400).send('Pas assez de couverts disponibles pour cette date.');
                return;
            }
 
            // Insère une nouvelle réservation
            const insertReservationSql = `
                INSERT INTO reservation_restaurant (id_utilisateur, nombre_couverts, date_reservation)
                VALUES (?, ?, ?)
            `;
            db.query(insertReservationSql, [id_utilisateur, nombre_couverts, date_reservation], (err, result) => {
                if (err) {
                    console.error('Erreur lors de l\'ajout de la réservation :', err);
                    res.status(500).send('Erreur serveur');
                    return;
                }
 
                res.send({
                    message: 'Réservation effectuée avec succès.',
                    id_reservation: result.insertId,
                });
            });
        });
    });
});
 
// Route pour supprimer une réservation
router.delete('/supprimer', (req, res) => {
    const { id_utilisateur, date_reservation } = req.body;
 
    // Vérifie si la réservation existe
    const checkReservationSql = `
        SELECT *
        FROM reservation_restaurant
        WHERE id_utilisateur = ? AND date_reservation = ?
    `;
    db.query(checkReservationSql, [id_utilisateur, date_reservation], (err, result) => {
        if (err) {
            console.error('Erreur lors de la vérification de la réservation :', err);
            res.status(500).send('Erreur serveur');
            return;
        }
 
        if (result.length === 0) {
            res.status(404).send('Aucune réservation trouvée pour cet utilisateur et cette date.');
            return;
        }
 
        // Supprime la réservation
        const deleteReservationSql = `
            DELETE FROM reservation_restaurant
            WHERE id_utilisateur = ? AND date_reservation = ?
        `;
        db.query(deleteReservationSql, [id_utilisateur, date_reservation], (err) => {
            if (err) {
                console.error('Erreur lors de la suppression de la réservation :', err);
                res.status(500).send('Erreur serveur');
                return;
            }
 
            res.send({
                message: 'Votre réservation a été annulée avec succès.',
            });
        });
    });
});
 
module.exports = router;