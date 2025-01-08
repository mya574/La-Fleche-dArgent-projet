const jwt = require('jsonwebtoken');
const secret = process.env.TOKEN_KEY;

module.exports = (req, res, next) => {
    const token = req.headers['authorization']?.split(' ')[1]; // recupere le token depuis le header de la requete
   
    if (!token) {
        return res.status(401).json({ message: 'Token manquant ou invalide' });
    }

    jwt.verify(token, secret, (err, decoded) => {
        if (err) {
            return res.status(401).json({ message: 'Token invalide' });
        }

        req.user = decoded; // toutes les infos de luser connecte
        //console.log(req.user)
        next(); 
    });
};
