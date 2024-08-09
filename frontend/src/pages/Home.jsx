import React from 'react';
import { Link } from 'react-router-dom';
import '../style/Home.css'
import teamManagement from '../assets/Team_Management2.png';
import Collaborate from '../assets/Collaboration.png'
import DashBoard from '../assets/DashBoard.png'
import Accessibility from '../assets/Accessibility.png'
import Testimonials from '../components/Testimonials';
import FAQ from '../components/FAQ';
import homestart from '../assets/file.png'
const Home = () => {
  return (
    <div className="home-container">
      <div className='home-start'>
        <div className='home-start-text'>
          <h1>TaskTracker: Simplify Team Collaboration and Task Management</h1>
          <p >🚀 Create teams, assign tasks, and track progress effortlessly with TaskTracker.</p>
          
          <Link to="/task-tracker">
            <button className="home-button">Go to Task Tracker App</button>
          </Link>
        </div>
        <div className='homestart-image'>
          <img src={homestart} alt="" />
        </div>
      </div>
      <div style={{fontSize:'1.8rem', fontWeight:'bolder'}}>Features</div>
      <div className='features'>
        <div className='home-ftext'>
          <div>Task & Project Management</div>
          <p>Effortlessly organize and track your team's work. Assign tasks, set priorities, and monitor progress with customizable statuses and deadlines. Our intuitive interface makes it easy to manage projects, ensuring that every task is accounted for and completed on time</p>
        </div>
        <div className='home-fimage'>
          <img src={teamManagement} alt="" />
        </div>
      </div>
      <div className='featuresR'>
        <div className='home-ftext'>
          <div>Team Collaboration & Communication</div>
          <p>Enhance team coordination with real-time collaboration tools. Share updates, comment on tasks, and communicate seamlessly within the platform. With integrated file management and cloud storage options, all your project resources are centralized and easily accessible.</p>
        </div>
        <div className='home-fimage'>
          <img src={Collaborate} alt="" />
        </div>
      </div>
      <div className='features'>
        <div className='home-ftext'>
          <div>Dashboards & Reporting</div>
          <p>Gain valuable insights with our customizable dashboards and detailed reports. Track key metrics like task completion rates and team productivity. Visualize data through charts and analytics to make informed decisions and optimize your workflows.</p>
        </div>
        <div className='home-fimage'>
          <img src={DashBoard} alt="" />
        </div>
      </div>
      <div className='featuresR'>
        <div className='home-ftext'>
          <div>Flexibility & Accessibility</div>
          <p>Stay connected and productive, no matter where you are. Our platform is mobile-friendly, ensuring you can manage tasks and collaborate on the go. With robust integrations, role-based access controls, and scalable options, our solution grows with your team and adapts to your specific needs.</p>
        </div>
        <div className='home-fimage'>
          <img src={Accessibility} alt="" />
        </div>
      </div>
      <Testimonials/>
      <FAQ/>
    </div>
  );
};

export default Home;
