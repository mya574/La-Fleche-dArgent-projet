const express = require('express');
const bodyParser = require('body-parser');
require('dotenv').config();

const app = express();
app.use(bodyParser.json()); // middleware 

// routes des fichier 
const userRoutes = require('./functions/users/user'); 
const soinRoutes = require('./functions/reservations/soin'); 
const ServicesSoinRoutes = require('./functions/services/soins'); 
const ServicesChambreRoutes = require('./functions/services/chambres'); 

// routes
app.use('/users', userRoutes); 
app.use('/soin', soinRoutes);
app.use('/services', ServicesChambreRoutes); 
app.use('/services', ServicesSoinRoutes); 

// par défaut
app.get('/', (req, res) => {
    res.send('Serveur fonctionnel');
});


const port = process.env.PORT || 3000;

app.listen(port, () => {
    console.log(`Serveur démarré sur http://localhost:${port}`);
});
