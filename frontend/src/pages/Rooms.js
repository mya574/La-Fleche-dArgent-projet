import React from "react";
import { Link } from "react-router-dom"; 
import Section from "../components/Section";
import Carousel from "../components/Carousel";
import ArrowButton from "../components/ArrowButton";
import room1 from '../assets/room.jpg'; 

const roomCategories = [
  { src: room1, alt: "Chambre Classique" },
  { src: room1, alt: "Chambre Confort" },
  { src: room1, alt: "Chambre Standing" },
  { src: room1, alt: "Suite" },
];

const Rooms = () => {
  return (
    <div className="page-wrapper">
      <main>
        
        <Section
          id="presentation-section"
          title="Nos Chambres"
          content={
                      <>
                       Découvrez nos différentes catégories de chambres, chacune offrant un confort et un service irréprochable. Que vous recherchiez une chambre standard, un espace plus confortable, ou une suite de luxe, nous avons une option qui répondra à vos attentes.
                       <div className="reserve-button-container">
                    <Link to="/reservation-chambre">
                      <button className="reserve-button">Réserver maintenant</button>
                    </Link>
                  </div>
                      </>
                    }
          image={room1}
        />

       
        <Carousel data={roomCategories} />

        
        <Section
          id="first-section"
          title="Chambre Classique"
          content="Nos chambres classiques offrent un confort simple et raffiné. Parfaites pour un séjour agréable, elles sont équipées de tout ce dont vous avez besoin pour un séjour reposant."
          image={room1}
        />
        <ArrowButton targetId="second-section" />

        
        <div id="second-section">
          <Section
            title="Chambre Confort"
            content="Nos chambres confort sont conçues pour vous offrir une expérience encore plus agréable. Plus spacieuses, avec des équipements haut de gamme et une ambiance chaleureuse."
            image={room1}
          />
          <ArrowButton targetId="third-section" />
        </div>

        
        <div id="third-section">
          <Section
            title="Chambre Standing"
            content="Nos chambres standing sont l’alliance parfaite du luxe et du confort. Elles offrent des prestations premium, un espace généreux et une décoration soignée."
            image={room1}
          />
          <ArrowButton targetId="fourth-section" />
        </div>

        
        <div id="fourth-section">
          <Section
            title="Suite"
            content="Nos suites sont l’incarnation du luxe. Offrant une vue imprenable, un grand espace, ainsi que des équipements exclusifs, elles sont idéales pour un séjour d’exception."
            image={room1}
          />
        </div>
      </main>
    </div>
  );
};

export default Rooms;
