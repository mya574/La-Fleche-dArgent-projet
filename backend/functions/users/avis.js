const express = require('express');
const router = express.Router();
const db = require('../../db');
const authMiddleware = require('../middleware/auth'); // import du middleware
require('dotenv').config();

// ajouter un avis
router.post('/add-avis', authMiddleware, (req, res) => {
    const { contenu} = req.body;
    console.log(req);
    const id_utilisateur = req.user.id; // id de l'utilisateur extrait du token

    // verification des donnees envoyees
    if (!id_utilisateur || !contenu  === undefined) {
        return res.status(400).json({ message: 'Données manquantes ou invalides.' });
    }
    //mettre la date sous le bon format
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

// supprimer un avis
router.post('/remove-avis', authMiddleware, (req, res) => {
    const { id_avis } = req.body;

    if (!id_avis) {
        return res.status(400).json({ message: 'ID de l\'avis manquant.' });
    }

    const sql = 'DELETE FROM avis WHERE id_avis = ?';
    db.query(sql, [id_avis], (err, result) => {
        if (err) {
            console.error('Erreur lors de la suppression de l\'avis :', err);
            return res.status(500).send('Erreur serveur');
        }
        res.status(200).json({ message: 'Avis supprimé avec succès' });
    });
});

module.exports = router;
