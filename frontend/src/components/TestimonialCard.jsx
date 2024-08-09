import React from 'react';
import '../style/Testimonials.css'

const TestimonialCard = ({ testimonial }) => {
  const { name, position, text, photo } = testimonial;

  return (
    <div className="testimonial-card">
      <div className="card-header">
        {photo && <img src={photo} alt={`${name}'s photo`} className="testimonial-photo" />}
        <div className="testimonial-details">
          <h3>{name}</h3>
          <p>{position}</p>
        </div>
      </div>
      <div className="testimonial-text">
        <p>{text}</p>
      </div>
    </div>
  );
};

export default TestimonialCard;
