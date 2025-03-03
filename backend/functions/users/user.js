//clemence
const express = require('express');
const router = express.Router();
const db = require('../../db');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const authMiddleware = require('../middleware/auth'); 
require('dotenv').config();
const secretKey = process.env.TOKEN_KEY;
//const saltRounds = process.env.SALT_ROUNDS;
const saltRounds = 12;


const generateToken = (user) => {
    const payload = {
        id: user.id_utilisateur,
        email: user.email_utilisateur,
        prenom: user.prenom_utilisateur,
        nom: user.nom_utilisateur,
        is_admin: user.is_admin,
    };
    return jwt.sign(payload, secretKey, { expiresIn: '5h' }); // le token expire après 5h donc je suis plus connecter apres 5h 
};

const verifyToken = require('../middleware/auth'); 

//connexion au compt 
router.post('/login', (req, res) => {
    const { email, password } = req.body;

    //vas chercher le user dans la bdd  si il existe 
    const sql = 'SELECT id_utilisateur, email_utilisateur, password, nom_utilisateur, prenom_utilisateur, is_admin FROM utilisateurs WHERE email_utilisateur = ?';
    db.query(sql, [email], (err, result) => {
        if (err) {
            console.error('Database query error:', err);
            return res.status(500).json({ success: false, message: 'Server error' });
        }

        if (result.length === 0) {
            return res.status(401).json({ success: false, message: 'User not found' });
        }

        // comparer le mdp hashé
        bcrypt.compare(password, result[0].password, (err, isMatch) => {
            if (err) {
                console.error('Error comparing passwords:', err);
                return res.status(500).json({ success: false, message: 'Server error' });
            }

            if (!isMatch) {
                return res.status(401).json({ success: false, message: 'Invalid credentials' });
            }

            // generer un token
            const token = generateToken(result[0]);
            //console.log(token);

            // renvoyer le token dans la reponse
            return res.status(200).json({ success: true, message: 'Login successful', token });
        });
    });
});

// route protegee pour récuperer les données de l'utilisateur connecté 
router.get('/profile', verifyToken, (req, res) => {
    const userId = req.user.id; // on récupère l'id de l'user depuis le token
    const sql = 'SELECT * FROM utilisateurs WHERE id_utilisateur = ?';
    db.query(sql, [userId], (err, result) => {
        if (err) {
            console.error('Database query error:', err);
            return res.status(500).send('Error connecting to the database');
        }
        res.status(200).send(result[0]); // retourne les infos de l'user
    });
});


// ajouter un nouvel utilisateur
router.post('/add-user', (req, res) => {
    console.log('Route /add-user atteinte');
    console.log('Données reçues :', req.body); 
    const { nom, prenom, email, password, address, phoneNumber } = req.body;
  
    if (!nom || !prenom || !email || !password || !address || !phoneNumber) {
      console.log('Un ou plusieurs champs sont manquants');
      return res.status(400).json({ message: 'Tous les champs sont requis.' });
    }
  
    const checkEmailSql = 'SELECT * FROM utilisateurs WHERE email_utilisateur = ?';
  
    db.query(checkEmailSql, [email], (err, result) => {
      if (err) {
        console.error('Erreur lors de la vérification de l\'email:', err);
        return res.status(500).json({ message: 'Erreur serveur' });
      }
  
      if (result.length > 0) {
        console.log('L\'email existe déjà.');
        return res.status(400).json({ message: 'L\'email existe déjà.' });
      }
  
      bcrypt.hash(password, saltRounds, (err, hashedPassword) => {
        if (err) {
          console.error('Erreur lors du hashage du mot de passe:', err);
          return res.status(500).json({ message: 'Erreur serveur' });
        }
  
        const sql = 'INSERT INTO utilisateurs (nom_utilisateur, prenom_utilisateur, email_utilisateur, is_admin, password, address, phoneNumber) VALUES (?, ?, ?, false, ?, ?, ?)';
  
        db.query(sql, [nom, prenom, email, hashedPassword, address, phoneNumber], (err, result) => {
          if (err) {
            console.error('Erreur lors de l\'ajout de l\'utilisateur:', err);
            return res.status(500).json({ message: 'Erreur serveur' });
          }
  
          console.log('Utilisateur ajouté avec succès, ID:', result.insertId);
          res.status(201).json({ message: 'Utilisateur ajouté avec succès', id_utilisateur: result.insertId });
        });
      });
    });
  });
// supprimer un utilisateur
router.post('/remove-user', (req, res) => {
    const { id_utilisateur } = req.body;

    const sql = 'DELETE FROM utilisateurs WHERE id_utilisateur = ?';
    db.query(sql, [id_utilisateur], (err, result) => {
        if (err) {
            console.error('Erreur lors de la suppression de l\'utilisateur :', err);
            res.status(500).send('Erreur serveur');
            return;
        }
        res.send({ message: 'Utilisateur supprimé avec succès' });
    });
});



router.get('/get-all-users',  verifyToken,  (req, res) => {
    const id_admin = req.user.is_admin;
    //console.log(id_admin);
    if (id_admin === 1) {
        //console.log("admin");
        const sql = 'SELECT * FROM utilisateurs';
        db.query(sql, (err, result) => {
        if (err) {
            console.error('Database query error:', err);
            return res.status(500).json({ success: false, message: 'Server error' });
        }
        res.status(200).json({ success: true, users: result });
    });

    }
    else {
        console.log("pas admin");
    }
    
});


module.exports = router;
