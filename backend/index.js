const express = require('express');
const bodyParser = require('body-parser');
require('dotenv').config();

const app = express();
app.use(bodyParser.json()); 


const userRoutes = require('./functions/users/user'); 
const soinRoutes = require('./functions/reservations/soin'); 
const chambreRoutes = require('./functions/reservations/chambre'); 
const restaurantRoutes = require('./functions/reservations/restaurant');


app.use('/users', userRoutes); 
app.use('/soin', soinRoutes); 
app.use('/chambre', chambreRoutes);
app.use('/restaurant', restaurantRoutes);  


app.get('/', (req, res) => {
    res.send('Serveur fonctionnel');
});

const port = process.env.PORT || 3000;

app.listen(port, () => {
    console.log(`Serveur démarré sur http://localhost:${port}`);
});
