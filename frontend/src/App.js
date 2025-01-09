import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
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
import Avis from './pages/Avis';
import Connexion from './pages/Connexion';
import Header2 from './components/Header2';
import Header from './components/Header';
import Footer from './components/Footer';

import './styles/global.css';  

function HeaderManager() {
  const location = useLocation();
  const isHeader2Required =
    location.pathname === '/admin' || location.pathname === '/user-profile';

  return isHeader2Required ? <Header2 /> : <Header />;
}

function App() {
  return (
    <Router>
      <HeaderManager />
      <main>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/chambres" element={<Rooms />} />
          <Route path="/restaurant" element={<Restaurant />} />
          <Route path="/massage" element={<Massage />} />
          <Route path="/reservation" element={<Reservation />} />
          <Route path="/about" element={<About />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/admin" element={<Admin />} />
          <Route path="/inscription" element={<Inscription />} />
          <Route path="/connexion" element={<Connexion />} />
          <Route path="/user-profile" element={<UserProfile />} />
          <Route path="/avis" element={<Avis />} /> 
        </Routes>
      </main>
      <Footer />
    </Router>
  );
}

export default App;
