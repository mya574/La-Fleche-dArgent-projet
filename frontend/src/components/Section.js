/*myriam*/
import React from "react";
import "./Section.css";

const Section = ({ id, title, content, image }) => (
  <section id={id} className="section">
    <div className="section-container">
      <div className="section-content">
        <h2>{title}</h2>
        <p>{content}</p>
      </div>
      {image && (
        <div className="section-image">
          <img src={image} alt={title} />
        </div>
      )}
    </div>
  </section>
);

export default Section;

