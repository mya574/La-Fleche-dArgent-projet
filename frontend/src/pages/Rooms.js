import React from "react";
import Carousel from "./component/Carousel"; // Import du composant Carousel
import { slides } from "./data/carouselData.json"; // Import des données du carrousel
import {Header} from "./components/Header.js";
function Rooms() {
  return (
    <div>
      <h1>Nos Chambres</h1>
      <p>Explorez nos différentes gammes de chambres : classique, confort, standing, et suites.</p>
      
      
      <Carousel data={slides} />
    </div>
  );
}

export default Rooms;
