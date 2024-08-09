import React, { useState } from 'react';
import '../style/faq.css'

const FAQ = () => {
  const [activeIndex, setActiveIndex] = useState(null);

  const faqs = [
    {
      question: 'How do I create an account?',
      answer: `To create an account, click on the "Sign Up" button at the top right corner of the homepage. Fill in the required details, such as your name, email address, and a secure password. Once you've completed the form, click "Submit" to create your account.`,
    },
    {
      question: 'How do I join a team?',
      answer: `To join a team, go to the "Joined Teams" section and click on "Join Team". Enter the team code recieved by your team leader. `,
    },
    {
      question: 'Can I create multiple teams?',
      answer: `Yes, you can create multiple teams. Simply navigate to the "Teams" section and click on "Create Team." Fill in the team details, such as name, description, and members, and then click "Create."`,
    },
    {
        question: 'How do I create and assign tasks?',
        answer: `To create a task, navigate to the "Tasks" section and click on "Add Task." Fill in the task details, including title, description, due date, and assign it to the desired team members. You can also attach files if necessary.`,
      },
    // Add more FAQs as needed
  ];

  const handleToggle = (index) => {
    setActiveIndex(activeIndex === index ? null : index);
  };

  return (
    <div className="faq-section">
      <h2 style={{marginBottom:'2vh'}}>Frequently Asked Questions</h2>
      {faqs.map((faq, index) => (
        <div key={index} className="faq-item">
          <div className="faq-question" onClick={() => handleToggle(index)}>
            <h3>{faq.question}</h3>
            <span>{activeIndex === index ? '-' : '+'}</span>
          </div>
          {activeIndex === index && <div className="faq-answer"><p>{faq.answer}</p></div>}
        </div>
      ))}
    </div>
  );
};

export default FAQ;
