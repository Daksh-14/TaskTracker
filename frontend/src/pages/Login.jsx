import React, { useState } from 'react';
import axiosInstance from '../config/axiosconfig';
import { useNavigate } from 'react-router-dom';

import { useAuth } from '../hooks/AuthContext.jsx';
import Loader from '../components/Loader';
import "../style/login.css"

const Login = () => {
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const {login}=useAuth()

  const [formData, setFormData] = useState({
    email: '',
    password: ''
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
        await axiosInstance.post('/auth/login', { formData });
        login();
        navigate('/'); // Redirect to home page after successful login
    } catch (error) {
        console.log(error);
    } finally {
        setFormData({
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
        <Loader/>
      ) : (
        <div className="form_layout">
          <div><h1>Login</h1></div>
            <form onSubmit={handleSubmit}>
                <div className="form_data">
                    <div className="form_value">
                      <label htmlFor="email">Email</label>
                      <input className='login_input' type="email" name="email" onChange={onChangeHandler} value={formData.email} placeholder="Email" required />
                    </div>
                    <div className="form_value">
                      <label htmlFor="password">Password</label>
                      <input className='login_input' type="password" name="password" onChange={onChangeHandler} value={formData.password} placeholder="Password" required />
                    </div>
                    <div className='button_container'>
                      <button className='login_submit' type="submit">Login</button>
                    </div>
                </div>
            </form>
        </div>
      )}
    </div>
  );
};

export { Login };
