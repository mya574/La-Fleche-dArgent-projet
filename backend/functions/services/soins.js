//clemence et maya mais pas eu le temps de s'en servir
const express = require('express');
const router = express.Router();
const db = require('../../db'); 

router.post('/add_soin', (req, res) => {//reserver un soin 
    const { nom_soin, prix_soin } = req.body;
    //on verifie si elle existe deja
    const querySoin = 'SELECT id_soin FROM soins WHERE nom_soin = ? AND  prix_soin = ? ';
    db.query(querySoin, [nom_soin, prix_soin], (err, results) => {
        if (err) {
            console.error('Erreur lors de la récupération du soin :', err);
            res.status(500).send('Erreur serveur');
            return;
        }
         
        if (results.length > 0) {//si elle existe deja, on le dit
            res.status(400).send({ message: 'Le soin existe déjà.' });
            return;
        }

        if (results.length === 0) {//si elle n'existe pas on l'ajoute
            const queryReservation = 'INSERT INTO soins ( nom_soin, prix_soin) VALUES (?, ?)';
            db.query(queryReservation, [nom_soin, prix_soin], (err, result) => {
                if (err) {
                    console.error('Erreur lors de l\'ajout de la réservation :', err);
                    res.status(500).send('Erreur serveur');
                    return;
                }

            res.send({ message: 'soin ajouté' });
        });
            return;
        }
        
    });
});

router.post('/remove_soin', (req, res) => {//supprimer un soin 
    const { id_soin } = req.body;
    //on verifie si elle existe deja
    const querySoin = 'DELETE FROM soins WHERE id_soin = ? ';
    db.query(querySoin, [id_soin], (err, results) => {
        if (err) {
            console.error('Erreur lors de la suppression du soin :', err);
            res.status(500).send('Erreur serveur');
            return;
        }
        res.send({ message: 'soin supprimee' });
        
    });
});

module.exports = router;
