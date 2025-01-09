import React from 'react';
import Section from "../components/Section";
import Carousel from "../components/Carousel";
import ArrowButton from "../components/ArrowButton";
import { Link } from 'react-router-dom';
import massage1 from '../assets/massage1.avif';
import massage2 from '../assets/salle-massage.jpg';
import massage3 from '../assets/massage-pierres.webp';
import haul from '../assets/haul-massage.avif';
import haul2 from '../assets/haul2.jpg';
import cabine2 from '../assets/cabine2.avif';
import huiles from '../assets/huiles.jpg';
import tonique from '../assets/tonique.webp';
import balinais from '../assets/balinais.webp';
import pierres from '../assets/pierre-massage.jpg';


const massageServices = [
  { src: massage2, alt: 'Gommage corps en cabine' },
  { src: massage1, alt: 'Massage relaxant balinais' },
  { src: massage3, alt: 'Massage aux pierres chaudes' },
];

const Massage = () => {
  return (
    <div className="page-wrapper">
      <main>
        {/* carousel */}
        <Carousel data={massageServices} />

        {/* première section */}
        <Section
          id="first-section"
          title="Le Salon de Massage"
          content={
            <>
              Bienvenue dans notre salon de massage, un endroit paisible où chaque soin est conçu pour vous offrir relaxation et bien-être. Découvrez notre large gamme de services, allant des massages relaxants aux soins tonifiants. Nous vous garantissons un moment de détente absolue dans un cadre calme et apaisant.
              <div style={{ display: 'flex', gap: '20px', marginTop: '20px' }}>
                <Link to="/reservation-spa">
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


        {/* services de massage */}
        <Section
          id="second-section"
          title="Nos Services"
          content="Nous proposons une variété de massages pour répondre à vos besoins spécifiques. Que vous cherchiez à vous détendre ou à revigorer votre corps, nous avons le soin idéal pour vous."
          image={haul2}
        />
        <ArrowButton targetId="third-section" />

        <Section
          id="third-section"
          title="Gommage Corps en Cabine"
          content="Notre gommage corporel en cabine vous permettra de libérer votre peau des cellules mortes tout en l'hydratant. Un soin idéal avant un massage relaxant."
          image={cabine2}

        />
        <ArrowButton targetId="fourth-section" />

        <Section
          id="fourth-section"
          title="Massage Relaxant aux Huiles Essentielles"
          content="Le massage relaxant aux huiles essentielles vous permettra de vous détendre profondément. Choisissez parmi nos huiles essentielles pour personnaliser votre expérience."
          image={huiles}
        />
        <ArrowButton targetId="fifth-section" />

        <Section
          id="fifth-section"
          title="Massage Tonique"
          content="Ce massage tonique est conçu pour stimuler la circulation sanguine et détendre les muscles tendus, vous permettant de vous sentir revitalisé et en pleine forme."
          image={tonique}
        />
        <ArrowButton targetId="sixth-section" />

        <Section
          id="sixth-section"
          title="Massage Balinais"
          content="Inspiré de la tradition balinaise, ce massage combine des techniques de pression, de pétrissage et d'étirement pour apporter détente et revitalisation."
          image={balinais}
        />
        <ArrowButton targetId="seventh-section" />

        <Section
          id="seventh-section"
          title="Massage aux Pierres Chaudes"
          content="Le massage aux pierres chaudes vous apportera une sensation de chaleur et de bien-être en stimulant les points de pression du corps, réduisant le stress et apaisant les tensions."
          image={pierres}
        />
      </main>
    </div>
  );
};

export default Massage;
