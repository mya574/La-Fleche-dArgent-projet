import React from "react";
import "./Section.css";

const Section = ({ title, content, image }) => (
  <section className="section">
    <div className="section-content">
      <h2>{title}</h2>
      <p>{content}</p>
    </div>
    {image && <img src={image} alt={title} />}
  </section>
);

export default Section;
