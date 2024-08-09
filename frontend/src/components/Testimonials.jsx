import React from 'react';
import Joe from '../assets/Joe.jpg'
import Mark from '../assets/Mark.jpg'
import Emily from '../assets/Emily.jpeg'
import TestimonialCard from './TestimonialCard';
import '../style/Testimonials.css'


const Testimonials = () => {
  const testimonials = [
    {
      name: 'Sarah Doe',
      position: 'Team Lead',
      text: `"Our productivity skyrocketed after we started using this platform. The task management and collaborative features made it so easy to coordinate with my team, even when we were all working remotely. It’s truly been a game-changer for us!"`,
      photo: Emily,
    },
    {
      name: 'Mark Smith',
      position: 'Developer',
      text: `"I love how customizable everything is! From task assignments to team communication, this platform has everything we need to keep our projects on track. The support team has also been super helpful and responsive."`,
      photo: Mark,
    },
    {
        name: 'Alex B.',
        position: 'Operations Manager',
        text: `"This platform has made managing our multiple teams much more efficient. The dashboard provides all the key metrics we need at a glance, and the reporting tools are excellent for our weekly meetings."`,
        photo: Joe,
      },
  ];

  return (
    <div className="testimonials" style={{display:'flex',flexDirection:'column', alignItems:'center',gap:'2vh'}}>
      <h2>What Our Users Say</h2>
      <div className="testimonial-list">
        {testimonials.map((testimonial, index) => (
          <TestimonialCard key={index} testimonial={testimonial} />
        ))}
      </div>
    </div>
  );
};

export default Testimonials;
