import React from 'react';
import { useForm } from 'react-hook-form';
import axios from 'axios';
import './Login.css';

function Login() {
  const { register, handleSubmit } = useForm();

  const onSubmit = async (data) => {
    try {
      // Make a POST request to your backend API to log in the user
      const response = await axios.post('/api/users/login', data);
      console.log(response.data); // Handle successful login (e.g., store JWT and redirect)
    } catch (error) {
      console.error('Login error:', error);
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <h2>Log In</h2>
      {/* Add input fields for username/email and password */}
      <button type="submit">Log In</button>
    </form>
  );
}

export default Login;