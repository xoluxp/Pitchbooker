import React, { useState, useEffect } from "react";
import axios from "axios";
import { useForm } from "react-hook-form";
import Modal from 'react-modal';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrash, faEdit, faPlus } from '@fortawesome/free-solid-svg-icons'; // Import the icons you need
import "./AdminDashboard.css";

// Custom hook for fetching data with loading state
const useFetchData = (url) => {
  const [data, setData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  

  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);
      try {
        const response = await axios.get(url);
        setData(response.data);
      } catch (error) {
        console.error(`Error fetching data from ${url}:`, error);
        setError(error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, [url]);

  return { data, isLoading, error, setData };
};

function AdminDashboard() {
  const {
    data: pitches,
    setData: setPitches,
  } = useFetchData("http://localhost:5000/pitches");
  const {
    data: bookings,
    setData: setBookings,
  } = useFetchData("http://localhost:5000/bookings");

  const [editingPitch, setEditingPitch] = useState(null);
  const [editingBooking, setEditingBooking] = useState(null);
  const {
    register,
    handleSubmit,
    reset,
    setValue,
    formState: { errors }
  } = useForm();

  // Function to refresh dashboard data
   const refreshDashboardData = async () => {
    try {
      const pitchesResponse = await axios.get('http://localhost:5000/pitches');
      setPitches(pitchesResponse.data);

      const bookingsResponse = await axios.get('http://localhost:5000/bookings');
      setBookings(bookingsResponse.data);
    } catch (error) {
      console.error('Error refreshing data:', error);
      // Optionally, display an error message to the user
    }
  };

  // --- Pitch Management ---

  const handlePitchEdit = (pitch) => {
    setEditingPitch(pitch);
    setValue("name", pitch.name);
    setValue("location", pitch.location);
    setValue("PitchType", pitch.PitchType);
  };

  const handlePitchUpdate = async (data) => {
    try {
      await axios.put(
        `http://localhost:5000/pitches/${editingPitch._id}`,
        data
      );
      // Refresh data after updating
      refreshDashboardData();
      setEditingPitch(null);
      reset();
      alert("Pitch updated successfully!");
    } catch (error) {
      console.error("Error updating pitch:", error);
      alert(`Error updating pitch: ${error.message}`);
    }
  };

  const handlePitchDelete = async (pitchId) => {
    try {
      await axios.delete(`http://localhost:5000/pitches/${pitchId}`);
      // Refresh data after deleting
      refreshDashboardData();
      alert("Pitch deleted successfully!");
    } catch (error) {
      console.error("Error deleting pitch:", error);
      alert(`Error deleting pitch: ${error.message}`);
    }
  };

  const onSubmitPitch = async (data) => {
    try {
      await axios.post("http://localhost:5000/pitches/add", data);
      // Refresh data after adding
      refreshDashboardData();
      reset();
      alert("Pitch added successfully!");
    } catch (error) {
      console.error("Error adding pitch:", error);
      alert(`Error adding pitch: ${error.message}`);
    }
  };

  // --- Booking Management ---

  const handleBookingEdit = (booking) => {
    setEditingBooking(booking);
    setValue("name", booking.name);
    setValue("pitch", booking.pitch);
    setValue("date", booking.date);
    setValue("time", booking.time);
  };

  const handleBookingUpdate = async (data) => {
    try {
      await axios.put(
        `http://localhost:5000/bookings/${editingBooking._id}`,
        data
      );
      // Refresh data after updating
      refreshDashboardData();
      setEditingBooking(null);
      reset();
      alert("Booking updated successfully!");
    } catch (error) {
      console.error("Error updating booking:", error);
      alert(`Error updating booking: ${error.message}`);
    }
  };

  const handleBookingDelete = async (bookingId) => {
    try {
      await axios.delete(`http://localhost:5000/bookings/${bookingId}`);
      // Refresh data after deleting
      refreshDashboardData();
      alert("Booking deleted successfully!");
    } catch (error) {
      console.error("Error deleting booking:", error);
      alert(`Error deleting booking: ${error.message}`);
    }
  };

  const onSubmitBooking = async (data) => {
    try {
      await axios.post("http://localhost:5000/bookings", data);
      // Refresh data after adding
      refreshDashboardData();
      reset();
      alert("Booking added successfully!");
    } catch (error) {
      console.error("Error adding booking:", error);
      alert(`Error adding booking: ${error.message}`);
    }
  };

  return (
    <div className="admin-dashboard">
      <h2>Admin Dashboard</h2>
      <section className="pitches-section card"> {/* Added card class */}
      <h3>Manage Pitches</h3>
      <ul>
        {pitches.map((pitch) => (
          <li key={pitch._id}>
            {pitch.name} - {pitch.location} - {pitch.PitchType}
            <button onClick={() => handlePitchEdit(pitch)}> <FontAwesomeIcon icon={faEdit} /> </button>
            <button className="delete-btn" onClick={() => handlePitchDelete(pitch._id)}><FontAwesomeIcon icon={faTrash} /> </button>
          </li>
        ))}
      </ul>

      <h3>Add New Pitch</h3>
      <form onSubmit={handleSubmit(onSubmitPitch)}>
          <div>
            <label htmlFor="name">Name:</label>
            <input
              type="text"
              id="name"
              {...register("name", { required: true })}
            />
            {errors.name && <span>This field is required</span>}
          </div>
        <div>
          <label htmlFor="location">Location:</label>
          <input type="text" id="location" {...register("location")} />
        </div>
        <div>
          <label htmlFor="PitchType">Pitch Type:</label>
          <input type="text" id="PitchType" {...register("PitchType")} />
        </div>
        <button type="submit">Add Pitch</button>
      </form>

      {/* Form for editing pitches */}
      <Modal 
        isOpen={!!editingPitch} 
        onRequestClose={() => { 
          setEditingPitch(null); 
          reset(); 
        }}
        contentLabel="Edit Pitch"
      >
        <h3>Edit Pitch</h3>
<form onSubmit={handleSubmit(handlePitchUpdate)}>
          
          <div>
            <label htmlFor="name">Name:</label>
            <input type="text" id="name" {...register("name")} />
          </div>
          <div>
            <label htmlFor="location">Location:</label>
            <input type="text" id="location" {...register("location")} />
          </div>
          <div>
            <label htmlFor="PitchType">Pitch Type:</label>
            <input type="text" id="PitchType" {...register("PitchType")} />
          </div>
          <button type="submit">Update Pitch</button>
          <button
            type="button"
            onClick={() => {
              setEditingPitch(null);
              reset();
            }}
          >
            Cancel
          </button>
        </form>
      </Modal>
    </section>

    <section className="bookings-section card"> {/* Added card class */}
      <h3>Bookings</h3>
      <table>
        <thead>
          <tr>
            <th>Name</th>
            <th>Pitch</th>
            <th>Date</th>
            <th>Time</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {bookings.map((booking) => (
            <tr key={booking._id}>
              <td>{booking.name}</td>
              <td>
                {pitches.find((pitch) => pitch._id === booking.pitch)?.name ||
                  "Unknown Pitch"}
              </td>
              <td>{booking.date}</td>
              <td>{booking.time}</td>
              <td>
                <button onClick={() => handleBookingEdit(booking)}>Edit</button>
                <button className="delete-btn" onClick={() => handleBookingDelete(booking._id)}>Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      <h3>Add New Booking</h3>
      <form onSubmit={handleSubmit(onSubmitBooking)}>
          <div>
            <label htmlFor="name">Name:</label>
            <input
              type="text"
              id="name"
              {...register("name", { required: true })}
            />
            {errors.name && <span>This field is required</span>}
          </div>
        <div>
          <label htmlFor="pitch">Select Pitch:</label>
          <select id="pitch" {...register("pitch")}>
            {pitches.map((pitch) => (
              <option key={pitch._id} value={pitch._id}>
                {pitch.name}
              </option>
            ))}
          </select>
        </div>
        <div>
          <label htmlFor="date">Date:</label>
          <input type="date" id="date" {...register("date")} />
        </div>
        <div>
          <label htmlFor="time">Time:</label>
          <input type="time" id="time" {...register("time")} />
        </div>
        <button type="submit">Add Booking</button>
      </form>

      {/* Form for editing bookings */}
      <Modal 
        isOpen={!!editingBooking} 
        onRequestClose={() => { 
          setEditingBooking(null); 
          reset(); 
        }}
        contentLabel="Edit Booking"
      >
        <h3>Edit Booking</h3>
<form onSubmit={handleSubmit(handleBookingUpdate)}>
          
          <div>
            <label htmlFor="name">Name:</label>
            <input type="text" id="name" {...register("name")} />
          </div>
          <div>
            <label htmlFor="pitch">Select Pitch:</label>
            <select id="pitch" {...register("pitch")}>
              {pitches.map((pitch) => (
                <option key={pitch._id} value={pitch._id}>
                  {pitch.name}
                </option>
              ))}
            </select>
          </div>
          <div>
            <label htmlFor="date">Date:</label>
            <input type="date" id="date" {...register("date")} />
          </div>
          <div>
            <label htmlFor="time">Time:</label>
            <input type="time" id="time" {...register("time")} />
          </div>
          <button type="submit">Update Booking</button>
          <button
            type="button"
            onClick={() => {
              setEditingBooking(null);
              reset();
            }}
          >
            Cancel
          </button>
        </form>
      </Modal>
      </section>
    </div>
  );
}

export default AdminDashboard;