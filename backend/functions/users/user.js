const express = require('express');
const router = express.Router();
const db = require('../../db');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const authMiddleware = require('../middleware/auth'); // import du middleware
require('dotenv').config();
const secretKey = process.env.TOKEN_KEY;
//const saltRounds = process.env.SALT_ROUNDS;
const saltRounds = 12;


const generateToken = (user) => {//creation du token
    const payload = {
        id: user.id_utilisateur,
        email: user.email_utilisateur,
        prenom: user.prenom_utilisateur,
        nom: user.nom_utilisateur,
        is_admin: user.is_admin,
    };
    return jwt.sign(payload, secretKey, { expiresIn: '5h' }); // token expire après 5h
};

//middleware pour vérifier et décoder le token
const verifyToken = (req, res, next) => {
    const token = req.headers['authorization']?.split(' ')[1]; // recupérer le token depuis le header : Authorization
    if (!token) return res.status(403).send('Access denied.');

    jwt.verify(token, secretKey, (err, decoded) => {
        if (err) return res.status(401).send('Invalid or expired token.');
        req.user = decoded; // stocker les données récuperees dans : req.user
        next();
    });
};

// route pour se connecter à son compte
router.post('/login', (req, res) => {
    const { email, password } = req.body;

    // verifier que l'utilisateur existe dans la bdd
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
            console.log(token);

            // renvoyer le token dans la reponse
            return res.status(200).json({ success: true, message: 'Login successful', token });
        });
    });
});

// route protegee pour récuperer les données de l'utilisateur connecté (requiert un token valide)
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
    console.log('Données reçues :', req.body); // Ajoutez cette ligne pour voir les données reçues
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

// modifier un utilisateur
router.post('/update-user', (req, res) => {
    const { id_utilisateur, nom, prenom, email } = req.body;

    if (!id_utilisateur) {
        res.status(400).send({ message: 'ID utilisateur requis pour la modification.' });
        return;
    }

    const updates = [];
    const values = [];

    if (nom) {
        updates.push('nom_utilisateur = ?');
        values.push(nom);
    }
    if (prenom) {
        updates.push('prenom_utilisateur = ?');
        values.push(prenom);
    }
    if (email) {
        updates.push('email_utilisateur = ?');
        values.push(email);
    }

    if (updates.length === 0) {
        res.status(400).send({ message: 'Aucune information fournie pour la mise à jour.' });
        return;
    }

    values.push(id_utilisateur);

    const sql = `UPDATE utilisateurs SET ${updates.join(', ')} WHERE id_utilisateur = ?`;
    db.query(sql, values, (err, result) => {
        if (err) {
            console.error('Erreur lors de la mise à jour de l\'utilisateur :', err);
            res.status(500).send('Erreur serveur');
            return;
        }
        res.send({ message: 'Utilisateur mis à jour avec succès' });
    });
});

module.exports = router;
