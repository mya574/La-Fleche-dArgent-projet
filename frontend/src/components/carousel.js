import React, { useState } from "react";
import "./carousel.css";
import { BsArrowLeftCircleFill, BsArrowRightCircleFill } from "react-icons/bs";

const Carousel = (props) => {
  const [slide, setSlide] = useState(0);
  const data = props.data;

  // Passer à la diapositive suivante
  const nextSlide = () => {
    setSlide(slide === data.length - 1 ? 0 : slide + 1);
  };

  // Revenir à la diapositive précédente
  const prevSlide = () => {
    setSlide(slide === 0 ? data.length - 1 : slide - 1);
  };

  return React.createElement(
    "div",
    { className: "carousel" },
    React.createElement(BsArrowLeftCircleFill, {
      className: "arrow arrow-left",
      onClick: prevSlide,
    }),
    data.map((item, idx) =>
      React.createElement("img", {
        src: item.src,
        alt: item.alt,
        key: idx,
        className: slide === idx ? "slide" : "slide-hidden",
      })
    ),
    React.createElement(BsArrowRightCircleFill, {
      className: "arrow arrow-right",
      onClick: nextSlide,
    }),
    React.createElement(
      "div",
      { className: "indicators" },
      data.map((_, idx) =>
        React.createElement("button", {
          key: idx,
          onClick: () => setSlide(idx),
          className: slide === idx ? "indicator" : "indicator indicator-inactive",
        })
      )
    )
  );
};

export default Carousel;
