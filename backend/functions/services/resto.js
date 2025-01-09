const express = require('express');
const router = express.Router();
const db = require('../../db');

// Route pour ajouter une réservation
router.post('/add_resto', (req, res) => {
  const { date_reservation, nombre_couverts } = req.body;
  console.log('Received data:', req.body);

  if (!date_reservation || !nombre_couverts) {
    return res.status(400).json({ message: 'Date et nombre de couverts sont requis.' });
  }

  const checkQuery = 'SELECT * FROM restaurant WHERE date = ?';
  db.query(checkQuery, [date_reservation], (err, results) => {
    if (err) {
      return res.status(500).json({ message: 'Erreur lors de la vérification de la date.', error: err });
    }

    console.log('Check query results:', results);

    if (results.length > 0) {
      return res.status(400).json({ message: 'La date existe déjà dans la table.' });
    }

    const insertQuery = 'INSERT INTO restaurant (date, nombre_couverts) VALUES (?, ?)';
    db.query(insertQuery, [date_reservation, nombre_couverts], (err, results) => {
      if (err) {
        return res.status(500).json({ message: 'Erreur lors de l\'insertion de la réservation.', error: err });
      }

      return res.status(200).json({ message: 'Réservation ajoutée avec succès.' });
    });
  });
});

// Route pour récupérer toutes les dates d'ouverture
router.get('/get_open_dates', (req, res) => {
  const query = 'SELECT date, nombre_couverts FROM restaurant';
  db.query(query, (err, results) => {
    if (err) {
      return res.status(500).json({ message: 'Erreur lors de la récupération des dates.', error: err });
    }

    return res.status(200).json(results);
  });
});

// Route pour supprimer une date d'ouverture
router.delete('/delete_open_date/:date', (req, res) => {
    const { date } = req.params;
  
    const deleteQuery = 'DELETE FROM restaurant WHERE date = ?';
    db.query(deleteQuery, [date], (err, results) => {
      if (err) {
        return res.status(500).json({ message: 'Erreur lors de la suppression de la date.', error: err });
      }
  
      return res.status(200).json({ message: 'Date supprimée avec succès.' });
    });
  });
  
module.exports = router;
