import React, { useState } from "react";
import "./Carousel.css";
import { BsArrowLeftCircle, BsArrowRightCircle } from "react-icons/bs";

const Carousel = ({ data }) => {
  const [slide, setSlide] = useState(0);

  const nextSlide = () => {
    setSlide((prevSlide) => (prevSlide === data.length - 1 ? 0 : prevSlide + 1));
  };

  const prevSlide = () => {
    setSlide((prevSlide) => (prevSlide === 0 ? data.length - 1 : prevSlide - 1));
  };

  return (
    <div className="carousel luxury-carousel">
      {/* Images avec overlay */}
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

      {/* Flèches de navigation */}
      <BsArrowLeftCircle className="arrow arrow-left" onClick={prevSlide} />
      <BsArrowRightCircle className="arrow arrow-right" onClick={nextSlide} />
    </div>
  );
};

export default Carousel;
