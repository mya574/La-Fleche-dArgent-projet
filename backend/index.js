const express = require('express');
const bodyParser = require('body-parser');
require('dotenv').config();

const app = express();
app.use(bodyParser.json()); 

const cors = require('cors');

// Configurez CORS pour autoriser des origines spécifiques ou toutes les origines
app.use(cors({
    origin: '*', // Autorise toutes les origines
    methods: ['GET', 'POST', 'PUT', 'DELETE'], // Méthodes autorisées
    allowedHeaders: ['Content-Type', 'Authorization'], // En-têtes autorisés
}));


 
// routes des fichier 
const userRoutes = require('./functions/users/user'); 
const avisRoutes = require('./functions/users/avis'); 
const soinRoutes = require('./functions/reservations/soin'); 
const chambreRoutes = require('./functions/reservations/chambre'); 
const restaurantRoutes = require('./functions/reservations/restaurant');


const ServicesSoinRoutes = require('./functions/services/soins'); 
const ServicesChambreRoutes = require('./functions/services/chambres'); 


app.use('/users', userRoutes); 
app.use('/avis', avisRoutes); 
app.use('/soin', soinRoutes); 
app.use('/chambre', chambreRoutes);
app.use('/restaurant', restaurantRoutes);  

app.use('/services', ServicesChambreRoutes); 
app.use('/services', ServicesSoinRoutes); 


app.get('/', (req, res) => {
    res.send('Serveur fonctionnel');
});

const port = process.env.PORT || 3000;

app.listen(port, () => {
    console.log(`Serveur démarré sur http://localhost:${port}`);
});
