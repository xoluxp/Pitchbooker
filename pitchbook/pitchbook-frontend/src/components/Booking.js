import React, { useState, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import axios from 'axios';
import './Booking.css';
import Header from './Header';
import Footer from './Footer';

function Booking() {
  const { register, handleSubmit, formState: { errors } } = useForm();
  const [pitches, setPitches] = useState([]);

  useEffect(() => {
    const fetchPitches = async () => {
      try {
        const response = await axios.get('http://localhost:5000/pitches');
        setPitches(response.data);
      } catch (error) {
        console.error('Error fetching pitches:', error);
      }
    };

    fetchPitches();
  }, []);

  const onSubmit = async (data) => {
    try {
      const response = await axios.post('http://localhost:5000/bookings', data);
      console.log(response.data); 
      // Optionally, add a success message or redirect the user
    } catch (error) {
      console.error('Booking error:', error);
      // Optionally, display an error message to the user
    }
  };

  return (
    <div>
      <Header />
      <form onSubmit={handleSubmit(onSubmit)} className="booking-form"> 
        <h2>Book a Pitch</h2>

        <div>
          <label htmlFor="name">Your Name:</label>
          <input type="text" id="name" {...register('name', { required: true })} />
          {errors.name && <span>This field is required</span>}
        </div>

        <div>
          <label htmlFor="teammates">Number of Teammates:</label>
          <input type="number" id="teammates" min="0" {...register('teammates')} />
        </div>

        <div>
          <label htmlFor="pitch">Select Pitch:</label>
          <select id="pitch" {...register('pitch')}>
            {pitches.map(pitch => (
              <option key={pitch._id} value={pitch._id}>{pitch.name}</option>
            ))}
          </select>
        </div>

        <div>
          <label htmlFor="date">Date:</label>
          <input type="date" id="date" {...register('date')} />
        </div>

        <div>
          <label htmlFor="time">Time:</label>
          <input type="time" id="time" {...register('time')} />
        </div>

        <button type="submit">Book Now</button>
      </form>
      <Footer />
    </div>
  );
}

export default Booking;