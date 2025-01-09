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
          <Route path="/admin" element={<Admin />} />
          <Route path="/inscription" element={<Inscription />} />
          <Route path="/user-profile" element={<UserProfile />} />
        </Routes>
      </main>
      <Footer />
    </Router>
  );
}

export default App;
