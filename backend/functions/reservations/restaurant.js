const express = require('express');
const router = express.Router();
const db = require('../../db');
const verifyToken = require('../middleware/auth'); // import du middleware
//  ajouter ou modifier une réservation
router.post('/reserve', (req, res) => {
    const { id_utilisateur, nombre_couverts, date_reservation } = req.body;
    console.log(req.body)
    //console.log(req.body);
 
    // verifie si l'utilisateur a deja réservé pour cette date
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
router.delete('/supprimer', (req, res) => {
    const { id_utilisateur, id_reservation } = req.body;

    //  si la réservation existe
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

        console.log('Résultats de la requête :', results); 

        res.json({ reservations: results });
    });
});

// recuperer toutes les réservations
router.get('/get-all-reservations', verifyToken, (req, res) => {
    const id_admin = req.user.is_admin;
    if (id_admin == 1) {
      const sql = 'SELECT * FROM reservation_restaurant';
      db.query(sql, (err, result) => {
        if (err) {
          console.error('Database query error:', err);
          return res.status(500).json({ success: false, message: 'Server error' });
        }
        res.status(200).json({ success: true, reservations: result });
      });
    } else {
      res.sendStatus(403);
    }
  });
  
  // recuperer les emails des utilisateurs avec leur id
  router.post('/get-emails', verifyToken, (req, res) => {
    const { userIds } = req.body;
  
    if (!userIds || !Array.isArray(userIds)) {
      return res.status(400).json({ message: 'IDs des utilisateurs manquants ou invalides.' });
    }
  
    const placeholders = userIds.map(() => '?').join(',');
    const sql = `SELECT id_utilisateur, email_utilisateur FROM utilisateurs WHERE id_utilisateur IN (${placeholders})`;
  
    db.query(sql, userIds, (err, result) => {
      if (err) {
        console.error('Erreur lors de la récupération des emails des utilisateurs :', err);
        return res.status(500).send('Erreur serveur');
      }
      res.status(200).json({ success: true, users: result });
    });
  });
  
module.exports = router;