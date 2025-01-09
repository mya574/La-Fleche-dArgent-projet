const express = require('express');
const router = express.Router();
const db = require('../../db');
const jwt = require('jsonwebtoken');

// Middleware pour authentifier le token JWT
function authenticateToken(req, res, next) {
    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1];

    if (!token) {
        return res.status(401).json({ message: 'Token manquant' });
    }

    jwt.verify(token, 'votre_secret_jwt', (err, user) => {
        if (err) {
            return res.status(403).json({ message: 'Token invalide ou expiré' });
        }

        req.user = { id: user.id };
        next();
    });
}

// Route pour ajouter ou modifier une réservation
router.post('/reserve', authenticateToken, (req, res) => {
    const { nombre_couverts, date_reservation, service, details } = req.body;
    const userId = req.user.id;

    if (!nombre_couverts || !date_reservation || !service) {
        return res.status(400).json({ message: 'Tous les champs requis doivent être remplis.' });
    }

    // Vérifie si l'utilisateur a déjà réservé pour cette date
    const userReservationCheckSql = `
        SELECT * 
        FROM reservation_restaurant
        WHERE id_utilisateur = ? AND date_reservation = ?
    `;
    db.query(userReservationCheckSql, [userId, date_reservation], (err, existingReservations) => {
        if (err) {
            console.error('Erreur lors de la vérification des réservations utilisateur :', err);
            return res.status(500).json({ message: 'Erreur serveur' });
        }

        if (existingReservations.length > 0) {
            const existingReservation = existingReservations[0];

            // Si le nombre de couverts est identique
            if (existingReservation.nombre_couverts === nombre_couverts) {
                return res.status(400).json({ message: 'Vous avez déjà réservé à cette date avec ce nombre de couverts.' });
            }

            // Si le nombre de couverts a été modifié
            updateReservation(existingReservation, nombre_couverts, date_reservation, userId, res);
        } else {
            // Nouvelle réservation
            createReservation(nombre_couverts, date_reservation, userId, res);
        }
    });
});

// Fonction pour mettre à jour une réservation existante
function updateReservation(existingReservation, nombre_couverts, date_reservation, userId, res) {
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
            return res.status(500).json({ message: 'Erreur serveur' });
        }

        const couvertsDisponibles = result.length > 0 ? result[0].couverts_disponibles + existingReservation.nombre_couverts : 0;

        if (nombre_couverts > couvertsDisponibles) {
            return res.status(400).json({ message: 'Pas assez de couverts disponibles pour cette date.' });
        }

        const updateReservationSql = `
            UPDATE reservation_restaurant
            SET nombre_couverts = ?
            WHERE id_utilisateur = ? AND date_reservation = ?
        `;
        db.query(updateReservationSql, [nombre_couverts, userId, date_reservation], (err) => {
            if (err) {
                console.error('Erreur lors de la mise à jour de la réservation :', err);
                return res.status(500).json({ message: 'Erreur serveur' });
            }

            res.json({ message: 'Votre réservation a été modifiée avec succès.' });
        });
    });
}

// Fonction pour créer une nouvelle réservation
function createReservation(nombre_couverts, date_reservation, userId, res) {
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
            return res.status(500).json({ message: 'Erreur serveur' });
        }

        const couvertsDisponibles = result.length > 0 ? result[0].couverts_disponibles : 0;

        if (nombre_couverts > couvertsDisponibles) {
            return res.status(400).json({ message: 'Pas assez de couverts disponibles pour cette date.' });
        }

        const insertReservationSql = `
            INSERT INTO reservation_restaurant (id_utilisateur, nombre_couverts, date_reservation)
            VALUES (?, ?, ?)
        `;
        db.query(insertReservationSql, [userId, nombre_couverts, date_reservation], (err, result) => {
            if (err) {
                console.error('Erreur lors de l\'ajout de la réservation :', err);
                return res.status(500).json({ message: 'Erreur serveur' });
            }

            res.json({ message: 'Réservation effectuée avec succès.', id_reservation: result.insertId });
        });
    });
}

// Route pour supprimer une réservation
router.delete('/supprimer', authenticateToken, (req, res) => {
    const { date_reservation } = req.body;
    const userId = req.user.id;

    const checkReservationSql = `
        SELECT * 
        FROM reservation_restaurant
        WHERE id_utilisateur = ? AND date_reservation = ?
    `;
    db.query(checkReservationSql, [userId, date_reservation], (err, result) => {
        if (err) {
            console.error('Erreur lors de la vérification de la réservation :', err);
            return res.status(500).json({ message: 'Erreur serveur' });
        }

        if (result.length === 0) {
            return res.status(404).json({ message: 'Aucune réservation trouvée pour cette date.' });
        }

        const deleteReservationSql = `
            DELETE FROM reservation_restaurant
            WHERE id_utilisateur = ? AND date_reservation = ?
        `;
        db.query(deleteReservationSql, [userId, date_reservation], (err) => {
            if (err) {
                console.error('Erreur lors de la suppression de la réservation :', err);
                return res.status(500).json({ message: 'Erreur serveur' });
            }

            res.json({ message: 'Votre réservation a été annulée avec succès.' });
        });
    });
});

module.exports = router;
