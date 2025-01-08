const jwt = require('jsonwebtoken');
const secret = process.env.TOKEN_KEY;

module.exports = (req, res, next) => {
    const token = req.headers['authorization']?.split(' ')[1]; // Récupère le token depuis l'en-tête Authorization

    if (!token) {
        return res.status(401).json({ message: 'Token manquant ou invalide' });
    }

    jwt.verify(token, secret, (err, decoded) => {
        if (err) {
            return res.status(401).json({ message: 'Token invalide' });
        }

        req.user = decoded; // L'ID de l'utilisateur est contenu dans le token
        next(); // Passe à la fonction suivante (la route de l'ajout d'avis)
    });
};
