/*karlson*/
import React, { useState } from "react";
import "./Carousel.css";
import { BsArrowLeftCircle, BsArrowRightCircle } from "react-icons/bs";

/* Composant Carousel */
const Carousel = ({ data }) => {
  const [slide, setSlide] = useState(0); /* État pour la diapositive active */

  const nextSlide = () => {
    setSlide((prevSlide) => 
      prevSlide === data.length - 1 ? 0 : prevSlide + 1
    ); /* Passe à la diapositive suivante */
  };

  const prevSlide = () => {
    setSlide((prevSlide) => 
      prevSlide === 0 ? data.length - 1 : prevSlide - 1
    ); /* Passe à la diapositive précédente */
  };

  return (
    <div className="carousel luxury-carousel">
      {/* Récupération des données de data */}
      {data.map((item, idx) => (
        <div
          key={idx}
          className={slide === idx ? "slide active" : "slide hidden"}
          style={{ backgroundImage: `url(${item.src})` }}
        >
          <div className="slide-content">
            <h2>{item.alt}</h2>
          </div>
        </div>
      ))}

      {/* Boutons droite et gauche */}
      <BsArrowLeftCircle className="arrow arrow-left" onClick={prevSlide} />
      <BsArrowRightCircle className="arrow arrow-right" onClick={nextSlide} />
    </div>
  );
};

export default Carousel;

