import React from "react";
import { Link } from "react-router-dom";
import Section from "../components/Section";
import Carousel from "../components/Carousel";
import ArrowButton from "../components/ArrowButton";
import haul from '../assets/haul.webp';
import suite from '../assets/suite.webp';
import standing from '../assets/standing.webp';
import confort from '../assets/confort.webp';
import classique from '../assets/classique.avif';
import confort2 from '../assets/confort2.jpg';
import classique2 from '../assets/classique2.jpg';
import suite2 from '../assets/suite2.webp';
import standing2 from '../assets/standing2.jpg';


const roomCategories = [
  { src: classique2, alt: "Chambre Classique" },
  { src: confort2, alt: "Chambre Confort" },
  { src: standing2, alt: "Chambre Standing" },
  { src: suite2, alt: "Suite" },
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
              Explorez nos chambres, conçues pour offrir confort et élégance. Chaque chambre est équipée pour répondre à vos besoins de relaxation et de commodité, tout en offrant une vue imprenable.
              <div style={{ display: 'flex', gap: '20px', marginTop: '20px' }}>
                <Link to="/reservation-chambre">
                  <button 
                    style={{
                      backgroundColor: 'green', 
                      color: 'white', 
                      border: 'none', 
                      padding: '10px 20px', 
                      fontSize: '16px', 
                      borderRadius: '5px', 
                      cursor: 'pointer'
                    }}
                  >
                    Réserver maintenant
                  </button>
                </Link>
                <Link to="/avis">
                  <button 
                    style={{
                      backgroundColor: 'blue', 
                      color: 'white', 
                      border: 'none', 
                      padding: '10px 20px', 
                      fontSize: '16px', 
                      borderRadius: '5px', 
                      cursor: 'pointer'
                    }}
                  >
                    Avis
                  </button>
                </Link>
              </div>
            </>
          }
          image={haul}
        />


        <Carousel data={roomCategories} />


        <Section
          id="first-section"
          title="Chambre Classique"
          content="Nos chambres classiques offrent un confort simple et raffiné. Parfaites pour un séjour agréable, elles sont équipées de tout ce dont vous avez besoin pour un séjour reposant."
          image={classique}
        />
        <ArrowButton targetId="second-section" />


        <div id="second-section">
          <Section
            title="Chambre Confort"
            content="Nos chambres confort sont conçues pour vous offrir une expérience encore plus agréable. Plus spacieuses, avec des équipements haut de gamme et une ambiance chaleureuse."
            image={confort}
          />
          <ArrowButton targetId="third-section" />
        </div>


        <div id="third-section">
          <Section
            title="Chambre Standing"
            content="Nos chambres standing sont l’alliance parfaite du luxe et du confort. Elles offrent des prestations premium, un espace généreux et une décoration soignée."
            image={standing}
          />
          <ArrowButton targetId="fourth-section" />
        </div>


        <div id="fourth-section">
          <Section
            title="Suite"
            content="Nos suites sont l’incarnation du luxe. Offrant une vue imprenable, un grand espace, ainsi que des équipements exclusifs, elles sont idéales pour un séjour d’exception."
            image={suite}
          />
        </div>
      </main>
    </div>
  );
};

export default Rooms;
