const express = require('express');
const router = express.Router();
const db = require('../../db');

router.post('/add_resto', (req, res) => {
  const { date_reservation, nombre_couverts } = req.body;
  //console.log('Received data:', req.body); // Ajoutez ce log pour déboguer
  //console.log(date_reservation)

  if (!date_reservation || !nombre_couverts) {
    return res.status(400).json({ message: 'Date et nombre de couverts sont requis.' });
  }

  // si la date existe déjà dans la table
  const checkQuery = 'SELECT * FROM restaurant WHERE date = ?';
  db.query(checkQuery, [date_reservation], (err, results) => {
    if (err) {
      return res.status(500).json({ message: 'Erreur lors de la vérification de la date.', error: err });
    }

    //console.log('Check query results:', results); 

    if (results.length > 0) {
      // la date existe déjà
      return res.status(400).json({ message: 'La date existe déjà.' });
    }

    // la date n'existe pas, on l'ajoute
    const insertQuery = 'INSERT INTO restaurant (date, nombre_couverts) VALUES (?, ?)';
    db.query(insertQuery, [date_reservation, nombre_couverts], (err, results) => {
      if (err) {
        return res.status(500).json({ message: 'Erreur lors de l\'insertion de la réservation.', error: err });
      }

      return res.status(200).json({ message: 'Jour ajouté avec succès.' });
    });
  });
});


router.get('/get_open_dates', (req, res) => {// récupérer toutes les dates d'ouverture
    const query = 'SELECT date, nombre_couverts FROM restaurant';
    db.query(query, (err, results) => {
      if (err) {
        return res.status(500).json({ message: 'Erreur lors de la récupération des dates.', error: err });
      }
  
      return res.status(200).json(results);
    });
  });

  
module.exports = router;
