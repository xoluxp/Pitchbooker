import React from 'react';
import { useForm } from 'react-hook-form';
import axios from 'axios';
import { useNavigate } from 'react-router-dom'; // Import useNavigate
import './Login.css';

function Login() {
  const { register, handleSubmit } = useForm();
  const navigate = useNavigate();

  const onSubmit = async (data) => {
    try {
      const response = await axios.post('http://localhost:5000/api/users/login', data);
      const token = response.data.accessToken;
      localStorage.setItem('token', token); // Store the JWT in local storage

      // Redirect to the admin dashboard after successful login
      navigate('/admin'); 
    } catch (error) {
      console.error('Login error:', error);
      // Optionally, display an error message to the user
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="login-form">
      <h2>Log In</h2>
      <div>
        <label htmlFor="username">Username:</label>
        <input type="text" id="username" {...register('username')} />
      </div>
      <div>
        <label htmlFor="password">Password:</label>
        <input type="password" id="password" {...register('password')} />
      </div>
      <button type="submit">Log In</button>
    </form>
  );
}

export default Login;