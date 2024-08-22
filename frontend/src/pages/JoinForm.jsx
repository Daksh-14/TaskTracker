import React, { useState } from 'react';
import axiosInstance from '../config/axiosconfig';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../hooks/AuthContext.jsx';
import Loader from '../components/Loader.jsx';
import "../style/login.css";

const JoinForm = () => {
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const { login } = useAuth();

  const [formData, setFormData] = useState({
    joincode: ''
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      await axiosInstance.post('/team/join', { formData });
      navigate('/task-tracker/joined');
    } catch (error) {
      console.log(error);
    } finally {
      setFormData({
        joincode: ''
      });
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
          <div><p>Join a team</p></div>
          <form onSubmit={handleSubmit}>
            <div className="form_data">
              <div className="form_value">
                <label htmlFor="joincode">Joining Code</label>
                <input className='login_input' type="text" name="joincode" onChange={onChangeHandler} value={formData.joincode} placeholder="Join Code" required />
              </div>
              <div className='button_container'>
                <button className='login_submit' type="submit">Join</button>
              </div>
            </div>
          </form>
        </div>
      )}
    </div>
  );
};

export { JoinForm };
