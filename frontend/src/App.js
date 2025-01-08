import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import Rooms from './pages/Rooms';
import Restaurant from './pages/Restaurant';
import Massage from './pages/Massage';
import Reservation from './pages/Reservation';
import Inscription from './pages/Inscription';
import UserProfile from './pages/UserProfile'; 
import Admin from './pages/Admin';
import About from './pages/About';
import Contact from './pages/Contact';
import Connexion from './pages/Connexion';
import AdminAccueil from './pages/admin/AccueilAdmin';
import Header from './components/Header';
import Footer from './components/Footer';

import './styles/global.css';  

function App() {
  return (
    <Router>
      <Header />
      <main>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/chambres" element={<Rooms />} />
          <Route path="/restaurant" element={<Restaurant />} />
          <Route path="/massage" element={<Massage />} />
          <Route path="/reservation" element={<Reservation />} />
          <Route path="/about" element={<About />} />
          <Route path="/contact" element={<Contact />} />
          
          <Route path="/inscription" element={<Inscription />} />
          <Route path="/connexion" element={<Connexion />} />
          <Route path="/user-profile" element={<UserProfile />} />
          <Route path="/administrateur" element={<AdminAccueil />} />
        </Routes>
      </main>
      <Footer />
    </Router>
  );
}

export default App;
