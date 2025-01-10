//clemence 
const express = require('express');
const router = express.Router();
const db = require('../../db');
const authMiddleware = require('../middleware/auth'); 
require('dotenv').config();

const verifyToken = require('../middleware/auth');


router.post('/add-avis', authMiddleware, (req, res) => {
    const { contenu} = req.body;
    console.log(req);
    const id_utilisateur = req.user.id; 

  
    if (!id_utilisateur || !contenu  === undefined) {
        return res.status(400).json({ message: 'Données manquantes ou invalides.' });
    }
   
    const currentDate = new Date();
    
    // jj/mm/aaaa
    const formattedDate = new Intl.DateTimeFormat('fr-FR').format(currentDate);
    //console.log(formattedDate);

    const sql = `INSERT INTO avis (id_utilisateur, contenu_avis, date_avis,  is_actif) VALUES (?, ?, ?, true)`;
    db.query(sql, [id_utilisateur, contenu, formattedDate], (err, result) => {
       
        if (err) {
            console.error('Erreur lors de l\'ajout de l\'avis :', err);
            return res.status(500).send('Erreur serveur');
        }
        res.status(201).json({ message: 'Avis ajouté avec succès', id_avis: result.insertId });
    });
});


router.post('/remove-avis', authMiddleware, (req, res) => {// supprimer un avis
    const { id_avis } = req.body;
    //console.log(id_avis, "remove");

    if (!id_avis) {
        return res.status(400).json({ message: 'ID de lavis manquant.' });
    }

    const sql = 'DELETE FROM avis WHERE id_avis = ?';
    db.query(sql, [id_avis], (err, result) => {
        if (err) {
            console.error('Erreur lors de la suppression de lavis :', err);
            return res.status(500).send('Erreur serveur');
        }
        res.status(200).json({ message: 'Avis supprimé avec succès' });
    });
});

router.post('/disable-avis', verifyToken, (req, res) => { //desactiver un avis
    const { id_avis } = req.body;
    //console.log(id_avis);
    //console.log(req.body);
  
    if (!id_avis) {
      return res.status(400).json({ message: 'ID de l\'avis manquant.' });
    }
  
    const sql = 'UPDATE avis SET is_actif = 0 WHERE id_avis = ?';
    db.query(sql, [id_avis], (err, result) => {
      if (err) {
        console.error('Erreur lors de la désactivation de l\'avis :', err);
        return res.status(500).send('Erreur serveur');
      }
      res.status(200).json({ message: 'Avis désactivé avec succès' });
    });
  });

  router.post('/unable-avis', verifyToken, (req, res) => {//activer un avis
    const { id_avis } = req.body;
    //console.log(id_avis);
    //console.log(req.body);
  
    if (!id_avis) {
      return res.status(400).json({ message: 'ID de l\'avis manquant.' });
    }
  
    const sql = 'UPDATE avis SET is_actif = 1 WHERE id_avis = ?';
    db.query(sql, [id_avis], (err, result) => {
      if (err) {
        console.error('Erreur lors de la désactivation de l\'avis :', err);
        return res.status(500).send('Erreur serveur');
      }
      res.status(200).json({ message: 'Avis désactivé avec succès' });
    });
  });

router.get('/get-all-avis',  verifyToken,  (req, res) => {
    const id_admin = req.user.is_admin;
    if (id_admin == 1) {
      const sql = 'SELECT * FROM avis';
      db.query(sql, (err, result) => {
        if (err) {
          console.error('Database query error:', err);
          return res.status(500).json({ success: false, message: 'Server error' });
        }
        
        res.status(200).json({ success: true, avis: result });
        //console.log(result);
      });
    } else {
      res.sendStatus(403);
    }
  });

  
router.get('/get-active-avis', authMiddleware, (req, res) => {//get tous les avis qui sont actif 
    const sql = 'SELECT * FROM avis WHERE is_actif = 1';
    db.query(sql, (err, result) => {
        if (err) {
            console.error('Database query error:', err);
            return res.status(500).json({ success: false, message: 'Server error' });
        }
        res.status(200).json({ success: true, avis: result });
    });
});

  
router.post('/get-emails', verifyToken, (req, res) => {//on recupemére les mailes des utilisateur via l'id
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

  
  // récupérer les prenoms des utilisateurs en fonction de leurs id (pour page avisform)
  router.post('/get-prenom', verifyToken, (req, res) => {
    const { userIds } = req.body;
  
    if (!userIds || !Array.isArray(userIds)) {
      return res.status(400).json({ message: 'IDs des utilisateurs manquants ou invalides.' });
    }
  
    const placeholders = userIds.map(() => '?').join(',');
    const sql = `SELECT id_utilisateur, prenom_utilisateur FROM utilisateurs WHERE id_utilisateur IN (${placeholders})`;
  
    db.query(sql, userIds, (err, result) => {
      if (err) {
        console.error('Erreur lors de la récupération des prenom des utilisateurs :', err);
        return res.status(500).send('Erreur serveur');
      }
      res.status(200).json({ success: true, users: result });
    });
  });
module.exports = router;
