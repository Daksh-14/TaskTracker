// Login.jsx
import React, { useState } from 'react';
import axiosInstance from '../config/axiosconfig';
import { useNavigate } from 'react-router-dom';
// import Loader from '../components/Loader'; // Import your Loader component
import "../style/login.css"

const SignUp = () => {
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    password: ''
  });
  
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
        await axiosInstance.post('/auth/register', { formData });
        navigate('/'); // Redirect to home page after successful login
    } catch (error) {
        console.log("yha")
        console.log(error);
    } finally {
        setFormData({
            firstName: '',
            lastName: '',
            email: '',
            password: ''
        })
        setLoading(false);
    }
  };
  const onChangeHandler = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
        ...prevData,
        [name]: value
    }));
  };
  return (
    <div className='form_outer'>
      {loading ? (
        <h1>loading</h1>
      ) : (
        <div className="form_layout SignUp">
          <div><h1>SignUp</h1></div>
            <form onSubmit={handleSubmit}>
                <div className="form_data">
                  <div className="form_value">
                    <label htmlFor="FirstName">First Name</label>
                    <input className='login_input' type="text" name="firstName" onChange={onChangeHandler} value={formData.firstName} placeholder="First Name" required />
                  </div>
                  <div className="form_value">
                      <label htmlFor="LastName">Last Name</label>
                      <input className='login_input' type="text" name="lastName" onChange={onChangeHandler} value={formData.lastName} placeholder="Last Name" required />
                  </div>
                  <div className="form_value">
                    <label htmlFor="email">Email</label>
                    <input className='login_input' type="email" name="email" onChange={onChangeHandler} value={formData.email} placeholder="Email" required />
                  </div>
                  <div className="form_value">
                    <label htmlFor="password">Password</label>
                    <input className='login_input' type="password" name="password" onChange={onChangeHandler} value={formData.password} placeholder="Password" required />
                  </div>
                  <div className='button_container'>
                    <button className='login_submit' type="submit">Sign Up</button>
                  </div>
                </div>
            </form>
        </div>
      )}
    </div>
  );
};

export { SignUp };
