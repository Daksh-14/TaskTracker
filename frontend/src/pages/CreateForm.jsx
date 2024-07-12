// Login.jsx
import React, { useState } from 'react';
import axiosInstance from '../config/axiosconfig';
import { useNavigate } from 'react-router-dom';

import { useAuth } from '../hooks/AuthContext.jsx';
import "../style/login.css"

const CreateForm = () => {
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const {login}=useAuth()

  const [formData, setFormData] = useState({
    teamName: ''
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
        await axiosInstance.post('/team/create', { formData });
        navigate('/task-tracker/created'); 
    } catch (error) {
        console.log(error);
    } finally {
        setFormData({
            teamName:''
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
        <div className="form_layout">
          <div><h1>Create your team</h1></div>
            <form onSubmit={handleSubmit}>
                <div className="form_data">
                    <div className="form_value">
                      <label htmlFor="teamName">Enter Team Name</label>
                      <input className='login_input' type="text" name="teamName" onChange={onChangeHandler} value={formData.teamName} placeholder="Team Name" required />
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

export { CreateForm };
