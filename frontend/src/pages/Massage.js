import React from 'react';
import Section from "../components/Section";
import Carousel from "../components/Carousel";
import ArrowButton from "../components/ArrowButton";
import room1 from '../assets/room.jpg'; 
import room2 from '../assets/room2.jpg'; 
import room3 from '../assets/room3.jpg'; 
import { Link } from 'react-router-dom';  

const massageServices = [
  { src: room1, alt: 'Gommage corps en cabine' },
  { src: room2, alt: 'Massage relaxant balinais' },
  { src: room3, alt: 'Massage aux pierres chaudes' },
];

const Massage = () => {
  return (
    <div className="page-wrapper">
      <main>
        {/* Carousel */}
        <Carousel data={massageServices} />

        {/* Première section avec description et bouton */}
        <Section
          id="first-section"
          title="Le Salon de Massage"
          content={
            <>
              Bienvenue dans notre salon de massage, un endroit paisible où chaque soin est conçu pour vous offrir relaxation et bien-être. Découvrez notre large gamme de services, allant des massages relaxants aux soins tonifiants. Nous vous garantissons un moment de détente absolue dans un cadre calme et apaisant.
              <div className="en-savoir-plus-container">
                <Link to="/reservation-spa">
                  <button className="reserve-button">Réserver maintenant</button>
                </Link>
              </div>
            </>
          }
          image={room1}
        />

        {/* Services de massage */}
        <Section
          id="second-section"
          title="Nos Services"
          content="Nous proposons une variété de massages pour répondre à vos besoins spécifiques. Que vous cherchiez à vous détendre ou à revigorer votre corps, nous avons le soin idéal pour vous."
          image={room2}
        />
        <ArrowButton targetId="third-section" />

        <Section
          id="third-section"
          title="Gommage Corps en Cabine"
          content="Notre gommage corporel en cabine vous permettra de libérer votre peau des cellules mortes tout en l'hydratant. Un soin idéal avant un massage relaxant."
          image={room2}

        />
        <ArrowButton targetId="fourth-section" />

        <Section
          id="fourth-section"
          title="Massage Relaxant aux Huiles Essentielles"
          content="Le massage relaxant aux huiles essentielles vous permettra de vous détendre profondément. Choisissez parmi nos huiles essentielles pour personnaliser votre expérience."
          image={room3}
        />
        <ArrowButton targetId="fifth-section" />

        <Section
          id="fifth-section"
          title="Massage Tonique"
          content="Ce massage tonique est conçu pour stimuler la circulation sanguine et détendre les muscles tendus, vous permettant de vous sentir revitalisé et en pleine forme."
          image={room2}
        />
        <ArrowButton targetId="sixth-section" />

        <Section
          id="sixth-section"
          title="Massage Balinais"
          content="Inspiré de la tradition balinaise, ce massage combine des techniques de pression, de pétrissage et d'étirement pour apporter détente et revitalisation."
          image={room2}
        />
        <ArrowButton targetId="seventh-section" />

        <Section
          id="seventh-section"
          title="Massage aux Pierres Chaudes"
          content="Le massage aux pierres chaudes vous apportera une sensation de chaleur et de bien-être en stimulant les points de pression du corps, réduisant le stress et apaisant les tensions."
          image={room1}
        />
      </main>
    </div>
  );
};

export default Massage;
