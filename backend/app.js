const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const mysql = require('mysql2');
require('dotenv').config();

const app = express();

// Middleware CORS
app.use(cors({
  origin: '*',  // Autorise toutes les origines
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  allowedHeaders: ['Content-Type', 'Authorization']
}));

// Middleware pour parser les données JSON
app.use(bodyParser.json());

// Connexion à la base de données
const connection = mysql.createConnection({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
});

connection.connect((err) => {
  if (err) {
    console.error('Error connecting to the database:', err.stack);
  } else {
    console.log('Connected to the database');
  }
});

// Middleware de vérification du token
const verifyToken = (req, res, next) => {
  const token = req.headers['authorization']?.split(' ')[1]; // récupérer le token
  if (!token) return res.status(403).send('Access denied.');
  jwt.verify(token, process.env.TOKEN_KEY, (err, decoded) => {
    if (err) return res.status(401).send('Invalid or expired token.');
    req.user = decoded; // Stocke l'utilisateur dans req.user
    next();
  });
};

// Inscription d'un utilisateur
app.post('/users/register', (req, res) => {
  console.log('Route /register atteinte');
  const { email, password, nom, prenom } = req.body;

  if (!email || !password || !nom || !prenom) {
    return res.status(400).json({ message: 'Tous les champs sont requis.' });
  }

  // Vérification si l'email existe déjà
  const checkEmailSql = 'SELECT * FROM utilisateurs WHERE email_utilisateur = ?';
  connection.query(checkEmailSql, [email], (err, result) => {
    if (err) {
      console.error('Erreur lors de la vérification de l\'email:', err);
      return res.status(500).json({ message: 'Erreur serveur' });
    }
    if (result.length > 0) {
      return res.status(400).json({ message: 'L\'email existe déjà.' });
    }

    // Hash du mot de passe
    bcrypt.hash(password, 12, (err, hashedPassword) => {
      if (err) {
        console.error('Erreur lors du hashage du mot de passe:', err);
        return res.status(500).json({ message: 'Erreur serveur' });
      }

      // Insertion dans la base de données
      const sql = 'INSERT INTO utilisateurs (email_utilisateur, password, nom_utilisateur, prenom_utilisateur, is_admin) VALUES (?, ?, ?, ?, false)';
      connection.query(sql, [email, hashedPassword, nom, prenom], (err, result) => {
        if (err) {
          console.error('Erreur lors de l\'ajout de l\'utilisateur:', err);
          return res.status(500).json({ message: 'Erreur serveur' });
        }
        res.status(201).json({ message: 'Utilisateur ajouté avec succès' });
      });
    });
  });
});

// Connexion d'un utilisateur
app.post('/users/login', (req, res) => {
  console.log('Route /login atteinte');
  const { email, password } = req.body;

  const sql = 'SELECT id_utilisateur, email_utilisateur, password, nom_utilisateur, prenom_utilisateur, is_admin FROM utilisateurs WHERE email_utilisateur = ?';
  connection.query(sql, [email], (err, result) => {
    if (err) {
      console.error('Erreur de la base de données:', err);
      return res.status(500).json({ message: 'Erreur serveur' });
    }

    if (result.length === 0) {
      return res.status(401).json({ message: 'Utilisateur non trouvé' });
    }

    // Comparaison du mot de passe
    bcrypt.compare(password, result[0].password, (err, isMatch) => {
      if (err || !isMatch) {
        return res.status(401).json({ message: 'Identifiants invalides' });
      }

      // Création du token JWT
      const token = jwt.sign({
        id: result[0].id_utilisateur,
        email: result[0].email_utilisateur,
        nom: result[0].nom_utilisateur,
        prenom: result[0].prenom_utilisateur,
        is_admin: result[0].is_admin
      }, process.env.TOKEN_KEY, { expiresIn: '5h' });

      res.status(200).json({ message: 'Connexion réussie', token });
    });
  });
});

// Profil de l'utilisateur connecté
app.get('/users/profile', verifyToken, (req, res) => {
  console.log('Route /profile atteinte');
  const userId = req.user.id;
  const sql = 'SELECT * FROM utilisateurs WHERE id_utilisateur = ?';
  connection.query(sql, [userId], (err, result) => {
    if (err) {
      return res.status(500).json({ message: 'Erreur serveur' });
    }
    res.status(200).json(result[0]);
  });
});

// Ajout d'un utilisateur
app.post('/users/adduser', (req, res) => {
  console.log('Route /adduser atteinte');
  const { nom, prenom, email, password } = req.body;

  if (!email || !password || !nom || !prenom) {
    return res.status(400).json({ message: 'Tous les champs sont requis.' });
  }

  const checkEmailSql = 'SELECT * FROM utilisateurs WHERE email_utilisateur = ?';

  connection.query(checkEmailSql, [email], (err, result) => {
    if (err) {
      console.error('Erreur lors de la vérification de l\'email:', err);
      return res.status(500).json({ message: 'Erreur serveur' });
    }

    if (result.length > 0) {
      return res.status(400).json({ message: 'L\'email existe déjà.' });
    }

    bcrypt.hash(password, 12, (err, hashedPassword) => {
      if (err) {
        return res.status(500).json({ message: 'Erreur lors du hashage du mot de passe.' });
      }

      const sql = 'INSERT INTO utilisateurs (nom_utilisateur, prenom_utilisateur, email_utilisateur, is_admin, password) VALUES (?, ?, ?, false, ?)';

      connection.query(sql, [nom, prenom, email, hashedPassword], (err, result) => {
        if (err) {
          return res.status(500).json({ message: 'Erreur serveur' });
        }
        return res.status(201).json({ message: 'Utilisateur ajouté avec succès', id_utilisateur: result.insertId });
      });
    });
  });
});

// Test de la connexion
app.get('/', (req, res) => {
  res.send('Serveur fonctionnel');
});

const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`Serveur démarré sur http://localhost:${port}`);
});
