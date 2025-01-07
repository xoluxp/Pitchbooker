import React from 'react';
import { useForm } from 'react-hook-form';
import axios from 'axios';
import './Signup.css';

function Signup() {
  const { register, handleSubmit, formState: { errors } } = useForm();

  const onSubmit = async (data) => {
    try {
      // Make a POST request to your backend API to create a new user
      const response = await axios.post('/api/users/register', data);
      console.log(response.data); // Handle successful registration (e.g., redirect to login)
    } catch (error) {
      console.error('Registration error:', error);
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <h2>Sign Up</h2>
      <div>
        <label htmlFor="username">Username:</label>
        <input type="text" id="username" {...register('username', { required: true })} />
        {errors.username && <span>This field is required</span>}
      </div>
      {/* Add more input fields for email, password, etc. */}
      <button type="submit">Sign Up</button>
    </form>
  );
}

export default Signup;