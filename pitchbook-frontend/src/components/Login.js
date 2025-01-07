import React from 'react';
import { useForm } from 'react-hook-form';
import axios from 'axios';
import './Login.css';

function Login() {
  const { register, handleSubmit } = useForm(); // register is now used

  const onSubmit = async (data) => {
    try {
      const response = await axios.post('/api/users/login', data);
      console.log(response.data);
    } catch (error) {
      console.error('Login error:', error);
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="login-form"> {/* Added class name */}
      <h2>Log In</h2>
      <div>
        <label htmlFor="username">Username:</label>
        <input type="text" id="username" {...register('username')} /> {/* Use register */}
      </div>
      <div>
        <label htmlFor="password">Password:</label>
        <input type="password" id="password" {...register('password')} /> {/* Use register */}
      </div>
      <button type="submit">Log In</button>
    </form>
  );
}

export default Login;