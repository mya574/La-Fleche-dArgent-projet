const express = require('express');
const bodyParser = require('body-parser');
require('dotenv').config();
const cors = require('cors');

const app = express();

// Configuration CORS
const corsOptions = {
  origin: 'http://localhost:3001', // Remplacez par l'URL de votre frontend
  methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
  credentials: true,
  optionsSuccessStatus: 204,
  allowedHeaders: ['Content-Type', 'Authorization'], // En-têtes autorisés
};

app.use(cors(corsOptions));

app.use(bodyParser.json());

app.use((req, res, next) => {
    //console.log('CORS Headers:', req.headers);
    res.header('Access-Control-Allow-Origin', 'http://localhost:3001');
    res.header('Access-Control-Allow-Methods', 'GET,HEAD,PUT,PATCH,POST,DELETE');
    res.header('Access-Control-Allow-Headers', 'Content-Type, Authorization');
    res.header('Access-Control-Allow-Credentials', 'true');
    next();
  });
  

// Routes des fichiers
const userRoutes = require('./functions/users/user');
const avisRoutes = require('./functions/users/avis');
const soinRoutes = require('./functions/reservations/soin');
const chambreRoutes = require('./functions/reservations/chambre');
const restaurantRoutes = require('./functions/reservations/restaurant');

const ServicesSoinRoutes = require('./functions/services/soins');
const ServicesChambreRoutes = require('./functions/services/chambres');
const ServicesRestoRoutes = require('./functions/services/resto');

app.use('/users', userRoutes);
app.use('/avis', avisRoutes);
app.use('/soin', soinRoutes);
app.use('/chambre', chambreRoutes);
app.use('/restaurant', restaurantRoutes);

app.use('/services', ServicesChambreRoutes);
app.use('/services', ServicesSoinRoutes);
app.use('/services', ServicesRestoRoutes);

app.get('/', (req, res) => {
  res.send('Serveur fonctionnel');
});

const port = process.env.PORT || 3000;

app.listen(port, () => {
  console.log(`Serveur démarré sur http://localhost:${port}`);
});
