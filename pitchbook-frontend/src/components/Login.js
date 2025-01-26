import React from 'react';
import { useForm } from 'react-hook-form';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import Header from '../components/Header';
import Footer from '../components/Footer';
import './Login.css';
import loginImage from './field3.jpg'; // Bg image import

function Login() {
  const { register, handleSubmit } = useForm();
  const navigate = useNavigate();

  const onSubmit = async (data) => {
    try {

      //this is a just a way to demonstrate a login request, by adding only a route and a method to the request
      //the upcoming login process will be more secure and complex using JWT and bcrypt for password hashing
      const response = await axios.post('http://localhost:5000/api/users/login', data);
      const token = response.data.accessToken;
      localStorage.setItem('token', token); // Store the JWT in local storage

      // Redirecting to the admin dashboard after successful login
      //
      navigate('/admin'); 
    } catch (error) {
      console.error('Login error:', error);
      // login error message
    }
  };

  return (
    <div className="login-container" style={{ backgroundImage: `url(${loginImage})` }}> 
    <div>
      <Header />
      
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
      <button  className="login-button" type="submit">Log In</button>
    </form>
    <Footer />
  </div>
  </div>
  );
}

export default Login;