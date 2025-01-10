import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import React, { useState, useEffect } from 'react';

import Home from './pages/Home';
import Rooms from './pages/Rooms';
import Restaurant from './pages/Restaurant';
import Massage from './pages/Massage';
import Reservation from './pages/Reservation';
import Inscription from './pages/Inscription';
import UserProfile from './pages/UserProfile';
import Avis from './pages/Avis';

import About from './pages/About';
import Contact from './pages/Contact';
import Connexion from './pages/Connexion';
import AdminAccueil from './pages/admin/AccueilAdmin';
import Header2 from './components/Header2';
import Header from './components/Header';
import Footer from './components/Footer';
import ReservationsResto from './pages/client/ClientReserv';
import CreateResto from './pages/admin/NewRestoAdmin';
import OpenDatesCalendar from './pages/client/JourOuverture';
import DeleteDatesCalendar from './pages/admin/SupprCalendrier';
import AvisForm from './pages/client/Avis';
import ReservationSoin from './pages/Reservation-spa';
import ReservationChambre from './pages/Reservation-chambre';
import MentionsLegales from './pages/MentionsLegales';
import ConditionsGeneralDeVente from './pages/ConditionsGeneralDeVente';
import './styles/global.css';


function HeaderManager({ isAuthenticated, onLogout }) {
  const location = useLocation();

  // definir si Header2 est obligatoire pour certaines pages
  const isHeader2Forced =
    location.pathname === '/admin' || location.pathname === '/user-profile';

  // si utilisateur authentifie ou page necessitant Header2, afficher Header2
  if (isAuthenticated || isHeader2Forced) {
    return <Header2 onLogout={onLogout} />;
  }
  // Sinon, afficher Header
  return <Header />;
}

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(!!localStorage.getItem('authToken'));

  const handleLogin = (token) => {
    localStorage.setItem('authToken', token);
    setIsAuthenticated(true);
  };


  const handleLogout = () => {
    localStorage.removeItem('authToken');
    setIsAuthenticated(false);
  };

  useEffect(() => {

    setIsAuthenticated(!!localStorage.getItem('authToken'));
  }, []);

  return (
    <Router>
      <HeaderManager isAuthenticated={isAuthenticated} onLogout={handleLogout} />
      <main>
        <Routes>
          <Route path="/about" element={<About />} />
          <Route path="/avis" element={<Avis />} />
          <Route
            path="/connexion"
            element={<Connexion onLogin={handleLogin} />}
          />
          <Route path="/" element={<Home />} />
          <Route path="/chambres" element={<Rooms />} />
          <Route path="/restaurant" element={<Restaurant />} />
          <Route path="/massage" element={<Massage />} />
          <Route path="/reservation" element={<Reservation />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/Avis" element={<Avis />} />

         
          <Route path="/inscription" element={<Inscription />} />
          <Route path="/user-profile" element={<UserProfile />} />
          
          <Route path="/reservresto" element={<ReservationsResto />} />
          <Route path="/avisform" element={<AvisForm />} />

          <Route path="/reservation-spa" element={<ReservationSoin />} />
          <Route path="/reservation-chambre" element={< ReservationChambre/>} />
          <Route path="/administrateur" element={<AdminAccueil />} />
          <Route path="/createresto" element={<CreateResto />} />
          <Route path="/opendate" element={<OpenDatesCalendar />} />
          <Route path="/deletecal" element={<DeleteDatesCalendar />} />
          <Route path='/mentions-legales' element={<MentionsLegales />}/> 
          <Route path='/conditions-generales-vente' element={<ConditionsGeneralDeVente />}/> 
        </Routes>
      </main>
      <Footer />
    </Router>
  );
}

export default App;
