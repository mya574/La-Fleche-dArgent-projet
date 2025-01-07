const express = require('express');
const router = express.Router();
const db = require('../../db'); 


router.post('/reserver-chambre', (req, res) => {
    const { id_utilisateur, id_chambre, date_debut, date_fin } = req.body;

   
    const queryChambre = 'SELECT nom_chambre, prix_chambre FROM chambres WHERE id_chambre = ?';
    db.query(queryChambre, [id_chambre], (err, results) => {
        if (err) {
            console.error('Erreur lors de la récupération de la chambre :', err);
            res.status(500).send('Erreur serveur');
            return;
        }

        if (results.length === 0) {
            res.status(404).send('Chambre non trouvée');
            return;
        }

        const { nom_chambre, prix_chambre } = results[0];

        
        const userReservationCheckQuery = `
            SELECT * 
            FROM reservation_chambres 
            WHERE id_utilisateur = ? 
            AND id_chambre = ?
            AND (
                (date_debut <= ? AND date_fin >= ?) OR 
                (date_debut <= ? AND date_fin >= ?)
            )
        `;
        db.query(userReservationCheckQuery, [id_utilisateur, id_chambre, date_debut, date_debut, date_fin, date_fin], (err, userReservations) => {
            if (err) {
                console.error('Erreur lors de la vérification des réservations utilisateur :', err);
                res.status(500).send('Erreur serveur');
                return;
            }

            if (userReservations.length > 0) {
                res.status(400).send('Vous avez déjà réservé cette chambre pour cette période.');
                return;
            }

            
            const checkAvailabilityQuery = `
                SELECT * 
                FROM reservation_chambres 
                WHERE id_chambre = ? 
                AND (
                    (date_debut <= ? AND date_fin >= ?) OR 
                    (date_debut <= ? AND date_fin >= ?)
                )
            `;
            db.query(checkAvailabilityQuery, [id_chambre, date_debut, date_debut, date_fin, date_fin], (err, reservations) => {
                if (err) {
                    console.error('Erreur lors de la vérification des disponibilités :', err);
                    res.status(500).send('Erreur serveur');
                    return;
                }

                if (reservations.length > 0) {
                    
                    res.status(400).send('La chambre est déjà réservée pour cette période par une autre personne.');
                    return;
                }

                
                const queryReservation = `
                    INSERT INTO reservation_chambres (id_utilisateur, id_chambre, nom_chambre, prix_chambre, date_debut, date_fin)
                    VALUES (?, ?, ?, ?, ?, ?)
                `;
                db.query(queryReservation, [id_utilisateur, id_chambre, nom_chambre, prix_chambre, date_debut, date_fin], (err, result) => {
                    if (err) {
                        console.error('Erreur lors de l\'ajout de la réservation :', err);
                        res.status(500).send('Erreur serveur');
                        return;
                    }

                    res.send({
                        message: 'Réservation de chambre effectuée avec succès',
                        id_reservation_chambre: result.insertId
                    });
                });
            });
        });
    });
});

module.exports = router;
