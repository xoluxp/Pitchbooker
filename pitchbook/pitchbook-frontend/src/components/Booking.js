import React, { useState, useEffect } from 'react';
import { useForm } from "react-hook-form";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import "./Booking.css";
import Header from "./Header";
import Footer from "./Footer";

function Booking() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const [pitches, setPitches] = useState([]);
  const [bookingConfirmed, setBookingConfirmed] = useState(false); // Add state for confirmation
  const navigate = useNavigate(); // Initialize useNavigate

  useEffect(() => {
    const fetchPitches = async () => {
      try {
        const response = await axios.get("http://localhost:5000/pitches");
        setPitches(response.data);
      } catch (error) {
        console.error("Error fetching pitches:", error);
      }
    };

    fetchPitches();
  }, []);

  const onSubmit = async (data) => {
    try {
      const response = await axios.post("http://localhost:5000/bookings", data);
      console.log(response.data);
      setBookingConfirmed(true);
      // alert('Booking created successfully!');  // uncomment to Show alert message to the user after booking
      // Fetching for updated pitches after every successful booking.
      // can add a delay or remove the timeout if you want to wait for the redirect.
      try {
        const updatedPitchesResponse = await axios.get(
          "http://localhost:5000/pitches"
        );
        setPitches(updatedPitchesResponse.data);
      } catch (error) {
        console.error("Error fetching updated pitches:", error);
      }

      setTimeout(() => {
        const bookedPitch = pitches.find(pitch => pitch._id === data.pitch);
        navigate('/confirmation', { 
          state: { 
            bookingData: {
              ...data, 
              pitchName: bookedPitch.name,
              pitchLocation: bookedPitch.location, // Add pitch location
              pitchType: bookedPitch.PitchType // Add pitch type
            } 
          } 
        });
      }, 2000); // 2 seconds delay
    } catch (error) {
      console.error('Booking error:', error);
      // Show error message to the user
      alert('Error creating booking. Please try again later.'); 
    }

  };
  return (
    <div>
      <Header />
{bookingConfirmed && ( // Conditionally render the confirmation message
        <div className="booking-confirmation">
          Booking confirmed! You will be redirected shortly...
        </div>
      )}
      <form onSubmit={handleSubmit(onSubmit)} className="booking-form">
        <h2>Book a Pitch</h2>

        <div>
          <label htmlFor="name">Your Name:</label>
          <input type="text" id="name" {...register('name', { required: true })} />
          {errors.name && <span>This field is required</span>}
        </div>

        <div>
          <label htmlFor="teammates">Number of Players:</label>
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