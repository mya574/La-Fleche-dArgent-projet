const express = require('express');
const router = express.Router();
const db = require('../../db');


router.get('/check-availability', (req, res) => {
    const { date } = req.query;

    const sql = `
        SELECT 
            restaurant.nombre_couverts - IFNULL(SUM(reservation_restaurant.nombre_couverts), 0) AS couverts_disponibles
        FROM restaurant
        LEFT JOIN reservation_restaurant ON restaurant.date = reservation_restaurant.date_reservation
        WHERE restaurant.date = ?
        GROUP BY restaurant.nombre_couverts

    `;
    db.query(sql, [date], (err, result) => {
        if (err) {
            console.error('Erreur lors de la vérification des disponibilités :', err);
            res.status(500).send('Erreur serveur');
            return;
        }

        if (result.length === 0) {
            res.status(404).send('Date non trouvée');
        } else {
            res.send({ date, couverts_disponibles: result[0].couverts_disponibles });
        }
    });
});


router.post('/reserve', (req, res) => {
    const { id_utilisateur, nombre_couverts, date_reservation } = req.body;

    
    const checkSql = `
        SELECT 
            restaurant.nombre_couverts - IFNULL(SUM(reservation_restaurant.nombre_couverts), 0) AS couverts_disponibles
        FROM restaurant
        LEFT JOIN reservation_restaurant ON restaurant.date = reservation_restaurant.date_reservation
        WHERE restaurant.date = ?
        GROUP BY restaurant.nombre_couverts
    `;
    db.query(checkSql, [date_reservation], (err, result) => {
        if (err) {
            console.error('Erreur lors de la vérification des disponibilités :', err);
            res.status(500).send('Erreur serveur');
            return;
        }

        
        if (result.length === 0 || result[0].couverts_disponibles < nombre_couverts) {
            res.status(400).send('Pas assez de couverts disponibles ou date inexistante');
            return;
        }

        
        const reserveSql = `
            INSERT INTO reservation_restaurant (id_utilisateur, nombre_couverts, date_reservation)
            VALUES (?, ?, ?)
        `;
        db.query(reserveSql, [id_utilisateur, nombre_couverts, date_reservation], (err, result) => {
            if (err) {
                console.error('Erreur lors de la réservation :', err);
                res.status(500).send('Erreur serveur');
                return;
            }
            res.send({ message: 'Réservation effectuée avec succès', id_reservation: result.insertId });
        });
    });
});

module.exports = router;
