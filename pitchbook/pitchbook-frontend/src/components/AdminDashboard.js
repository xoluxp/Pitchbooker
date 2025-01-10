import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useForm } from 'react-hook-form';
import './AdminDashboard.css';

function AdminDashboard() {
  const [pitches, setPitches] = useState([]);
  const [bookings, setBookings] = useState([]);
  const { register, handleSubmit, reset } = useForm(); // Initialize useForm

  useEffect(() => {
    const fetchPitches = async () => {
      try {
        const response = await axios.get('http://localhost:5000/pitches');
        setPitches(response.data);
      } catch (error) {
        console.error('Error fetching pitches:', error);
      }
    };

    const fetchBookings = async () => {
      try {
        const response = await axios.get('http://localhost:5000/bookings');
        setBookings(response.data);
      } catch (error) {
        console.error('Error fetching bookings:', error);
      }
    };

    fetchPitches();
    fetchBookings();
  }, []);

  const handlePitchDelete = async (pitchId) => {
    try {
      await axios.delete(`http://localhost:5000/pitches/${pitchId}`);
      setPitches(pitches.filter(pitch => pitch._id !== pitchId));
    } catch (error) {
      console.error('Error deleting pitch:', error);
    }
  };

  const onSubmit = async (data) => {
    try {
      await axios.post('http://localhost:5000/pitches/add', data);
      setPitches([...pitches, data]); // Update pitches state
      reset(); // Reset the form after successful submission
    } catch (error) {
      console.error('Error adding pitch:', error);
    }
  };

  return (
    <div className="admin-dashboard">
      <h2>Admin Dashboard</h2>

      <h3>Manage Pitches</h3>
      <ul>
        {pitches.map(pitch => (
          <li key={pitch._id}>
            {pitch.name} - {pitch.location} - {pitch.PitchType}
            <button onClick={() => handlePitchDelete(pitch._id)}>Delete</button>
          </li>
        ))}
      </ul>

      <h3>Add New Pitch</h3>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div>
          <label htmlFor="name">Name:</label>
          <input type="text" id="name" {...register('name')} />
        </div>
        <div>
          <label htmlFor="location">Location:</label>
          <input type="text" id="location" {...register('location')} />
        </div>
        <div>
          <label htmlFor="PitchType">Pitch Type:</label>
          <input type="text" id="PitchType" {...register('PitchType')} />
        </div>
        {/* Add other fields as needed */}
        <button type="submit">Add Pitch</button>
      </form>

      <h3>Bookings</h3>
      <table>
        <thead>
          <tr>
            <th>Name</th>
            <th>Pitch</th>
            <th>Date</th>
            <th>Time</th>
          </tr>
        </thead>
        <tbody>
          {bookings.map(booking => (
            <tr key={booking._id}>
              <td>{booking.name}</td>
              <td>{pitches.find(pitch => pitch._id === booking.pitch)?.name || 'Unknown Pitch'}</td>
              <td>{booking.date}</td>
              <td>{booking.time}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default AdminDashboard;