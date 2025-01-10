//maya

const express = require('express');
const router = express.Router();
const db = require('../../db');
 
//réserver ou modifier une réservation
router.post('/reserve', (req, res) => {
    const { id_utilisateur, nombre_couverts, date_reservation } = req.body;
    //console.log(req.body)
    //console.log(req.body);
 
    // vérifie si l'utilisateur a déjà réservé pour cette date
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
            
 
            //Si le nombre de couverts est identique ca renvoi deja reserver a cette date 
            if (existingReservation.nombre_couverts === nombre_couverts) {
                res.status(400).send('Vous avez déjà réservé à cette date avec ce nombre de couverts.');
                return;
            }
 
            //si nombre de couvers modifier modifie dans la bdd
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
 
                //mise a jour la reservation avec les nouvelle information
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
 
        //nouvelle reservation
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
 
            // insère la nouvelle réservation
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
router.delete('/supprimer', (req, res) => {
    const { id_utilisateur, id_reservation } = req.body;

    // vérifie si la réservation existe pour pouvoir la suprimmer 
    const checkReservationSql = `
        SELECT *
        FROM reservation_restaurant
        WHERE id_reservation = ? AND id_utilisateur = ?
    `;
    db.query(checkReservationSql, [id_reservation, id_utilisateur], (err, result) => {
        if (err) {
            console.error('Erreur lors de la vérification de la réservation :', err);
            res.status(500).send('Erreur serveur');
            return;
        }

        if (result.length === 0) {
            res.status(404).send('Aucune réservation trouvée pour cet utilisateur et cette date.');
            return;
        }

        // supprime la réservation 
        const deleteReservationSql = `
            DELETE FROM reservation_restaurant
            WHERE id_reservation = ? AND id_utilisateur = ?
        `;
        db.query(deleteReservationSql, [id_reservation, id_utilisateur], (err) => {
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

router.post('/get-all-res-resto', (req, res) => {
    const { id_utilisateur } = req.body;
    //console.log(req.body);

    const getReservationsQuery = `
        SELECT *
        FROM reservation_restaurant
        WHERE id_utilisateur = ?
    `;
    db.query(getReservationsQuery, [id_utilisateur], (err, results) => {
        if (err) {
            console.error('Erreur lors de la récupération des réservations :', err);
            res.status(500).send('Erreur serveur');
            return;
        }

        //console.log('Résultats de la requête :', results); // Ajouter un log pour voir les résultats

        res.json({ reservations: results });
    });
});

module.exports = router;