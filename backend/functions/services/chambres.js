const express = require('express');
const router = express.Router();
const db = require('../../db'); 

router.post('/add_chambre', (req, res) => {//ajouter un soin 
    const { nom_chambre, prix_chambre } = req.body;
    //on verifie si elle existe deja
    const querySoin = 'SELECT id_chambre FROM chambres WHERE nom_chambre = ? AND  prix_chambre = ? ';
    db.query(querySoin, [nom_chambre, prix_chambre], (err, results) => {
        if (err) {
            console.error('Erreur lors de la récupération du soin :', err);
            res.status(500).send('Erreur serveur');
            return;
        }
         
        if (results.length > 0) {//si elle existe deja, on le dit
            res.status(400).send({ message: 'La chambre existe déjà.' });
            return;
        }

        if (results.length === 0) {//si elle n'existe pas on l'ajoute
            const queryReservation = 'INSERT INTO chambres ( nom_chambre, prix_chambre) VALUES (?, ?)';
            db.query(queryReservation, [nom_chambre, prix_chambre], (err, result) => {
                if (err) {
                    console.error('Erreur lors de l\'ajout de la réservation :', err);
                    res.status(500).send('Erreur serveur');
                    return;
                }

            res.send({ message: 'chambre ajoutée' });
        });
            return;
        }
        
    });
});

router.post('/remove_chambre', (req, res) => {//supprimer un soin 
    const { id_chambre } = req.body;
    //on verifie si elle existe deja
    const querySoin = 'DELETE FROM chambres WHERE id_chambre = ? ';
    db.query(querySoin, [id_chambre], (err, results) => {
        if (err) {
            console.error('Erreur lors de la suppression du soin :', err);
            res.status(500).send('Erreur serveur');
            return;
        }
        res.send({ message: 'chambre supprimee' });
        
    });
});

module.exports = router;
