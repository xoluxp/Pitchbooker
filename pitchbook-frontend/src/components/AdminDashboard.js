import React, { useState, useEffect } from "react";
import axios from "axios";
import { useForm } from "react-hook-form";
import Modal from "react-modal";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrash, faEdit, faSpinner } from "@fortawesome/free-solid-svg-icons";

import "./AdminDashboard.css";

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
        isLoading: pitchesLoading,
        error: pitchesError,
        setData: setPitches,
    } = useFetchData("http://localhost:5000/pitches");
    const {
        data: bookings,
        isLoading: bookingsLoading,
        error: bookingsError,
        setData: setBookings,
    } = useFetchData("http://localhost:5000/bookings");

    const [editingPitch, setEditingPitch] = useState(null);
    const [editingBooking, setEditingBooking] = useState(null);
    const [feedbackMessage, setFeedbackMessage] = useState(null);
    const [feedbackType, setFeedbackType] = useState(null); // 'success' or 'error'

    // Separate useForm instances for pitches and bookings
    const {
        register: registerPitch,
        handleSubmit: handleSubmitPitch,
        reset: resetPitch,
        setValue: setValuePitch,
        formState: { errors: pitchErrors },
    } = useForm();

    const {
        register: registerBooking,
        handleSubmit: handleSubmitBooking,
        reset: resetBooking,
        setValue: setValueBooking,
        formState: { errors: bookingErrors },
    } = useForm();

    const refreshDashboardData = async () => {
        try {
            const pitchesResponse = await axios.get("http://localhost:5000/pitches");
            setPitches(pitchesResponse.data);

            const bookingsResponse = await axios.get("http://localhost:5000/bookings");
            setBookings(bookingsResponse.data);
        } catch (error) {
            console.error("Error refreshing data:", error);
            setFeedbackMessage("Error refreshing data");
            setFeedbackType("error");
        }
    };

    const handlePitchEdit = (pitch) => {
        setEditingPitch(pitch);
        setValuePitch("name", pitch.name);
        setValuePitch("location", pitch.location);
        setValuePitch("PitchType", pitch.PitchType);
    };

    const handlePitchUpdate = async (data) => {
        try {
            await axios.put(`http://localhost:5000/pitches/${editingPitch._id}`, data);

            refreshDashboardData();
            setEditingPitch(null);
            resetPitch();
            setFeedbackMessage("Pitch updated successfully!");
            setFeedbackType("success");
        } catch (error) {
            console.error("Error updating pitch:", error);
            setFeedbackMessage(`Error updating pitch: ${error.message}`);
            setFeedbackType("error");
        }
    };

    const handlePitchDelete = async (pitchId) => {
        try {
            await axios.delete(`http://localhost:5000/pitches/${pitchId}`);

            refreshDashboardData();
            setFeedbackMessage("Pitch deleted successfully!");
            setFeedbackType("success");
        } catch (error) {
            console.error("Error deleting pitch:", error);
            setFeedbackMessage(`Error deleting pitch: ${error.message}`);
            setFeedbackType("error");
        }
    };

    const onSubmitPitch = async (data) => {
        try {
            await axios.post("http://localhost:5000/pitches/add", data);

            refreshDashboardData();
            resetPitch();
            setFeedbackMessage("Pitch added successfully!");
            setFeedbackType("success");
        } catch (error) {
            console.error("Error adding pitch:", error);
            setFeedbackMessage(`Error adding pitch: ${error.message}`);
            setFeedbackType("error");
        }
    };

    const handleBookingEdit = (booking) => {
        setEditingBooking(booking);
        setValueBooking("name", booking.name);
        setValueBooking("pitch", booking.pitch);
        setValueBooking("date", booking.date);
        setValueBooking("time", booking.time);
    };

    const handleBookingUpdate = async (data) => {
        try {
            await axios.put(`http://localhost:5000/bookings/${editingBooking._id}`, data);

            refreshDashboardData();
            setEditingBooking(null);
            resetBooking();
            setFeedbackMessage("Booking updated successfully!");
            setFeedbackType("success");
        } catch (error) {
            console.error("Error updating booking:", error);
            setFeedbackMessage(`Error updating booking: ${error.message}`);
            setFeedbackType("error");
        }
    };

    const handleBookingDelete = async (bookingId) => {
        try {
            await axios.delete(`http://localhost:5000/bookings/${bookingId}`);

            refreshDashboardData();
            setFeedbackMessage("Booking deleted successfully!");
            setFeedbackType("success");
        } catch (error) {
            console.error("Error deleting booking:", error);
            setFeedbackMessage(`Error deleting booking: ${error.message}`);
            setFeedbackType("error");
        }
    };

    const onSubmitBooking = async (data) => {
        try {
            await axios.post("http://localhost:5000/bookings/add", data);

            refreshDashboardData();
            resetBooking();
            setFeedbackMessage("Booking added successfully!");
            setFeedbackType("success");
        } catch (error) {
            console.error("Error adding booking:", error);
            setFeedbackMessage(`Error adding booking: ${error.message}`);
            setFeedbackType("error");
        }
    };

    // Calculate upcoming bookings within the next week
    const upcomingBookings = bookings.filter((booking) => {
        const bookingDate = new Date(booking.date);
        const today = new Date();
        const oneWeekFromToday = new Date();
        oneWeekFromToday.setDate(today.getDate() + 7);
        return bookingDate >= today && bookingDate <= oneWeekFromToday;
    });

    return (
        <div className="admin-dashboard">
            <h2>Admin Dashboard</h2>

            {/* Feedback message */}
            {feedbackMessage && (
                <div className={`feedback-message ${feedbackType}`}>
                    {feedbackMessage}
                </div>
            )}

            <div className="cards-container">
                {/* Pitches Card */}
                <div className="card pitches-card">
                    <h3>Total Pitches</h3>
                    {pitchesLoading ? (
                        <div className="loading">
                            <FontAwesomeIcon icon={faSpinner} spin />
                        </div>
                    ) : pitchesError ? (
                        <div className="error">Error: {pitchesError.message}</div>
                    ) : (
                        <div className="total-count">{pitches.length}</div>
                    )}
                </div>

                {/* Bookings Card */}
                <div className="card bookings-card">
                    <h3>Total Bookings</h3>
                    {bookingsLoading ? (
                        <div className="loading">
                            <FontAwesomeIcon icon={faSpinner} spin />
                        </div>
                    ) : bookingsError ? (
                        <div className="error">Error: {bookingsError.message}</div>
                    ) : (
                        <div className="total-count">{bookings.length}</div>
                    )}
                </div>

                {/* Upcoming Bookings Card */}
                <div className="card upcoming-bookings-card">
                    <h3>Upcoming Bookings</h3>
                    {bookingsLoading ? (
                        <div className="loading">
                            <FontAwesomeIcon icon={faSpinner} spin />
                        </div>
                    ) : bookingsError ? (
                        <div className="error">Error: {bookingsError.message}</div>
                    ) : (
                        <div className="total-count">{upcomingBookings.length}</div>
                    )}
                </div>
            </div>

            <section className="pitches-section card">
                <h3>Manage Pitches</h3>

                {pitchesLoading ? (
                    <div className="loading">
                        <FontAwesomeIcon icon={faSpinner} spin /> Loading pitches...
                    </div>
                ) : pitchesError ? (
                    <div className="error">Error loading pitches: {pitchesError.message}</div>
                ) : (
                    <div className="pitch-list">
                        {pitches.map((pitch) => (
                            <div key={pitch._id} className="pitch-card">
                                <h4>{pitch.name}</h4>
                                <p>Location: {pitch.location}</p>
                                <p>Type: {pitch.PitchType}</p>
                                <div className="actions">
                                    <button onClick={() => handlePitchEdit(pitch)} className="edit-btn">
                                        <FontAwesomeIcon icon={faEdit} /> Edit
                                    </button>
                                    <button
                                        className="delete-btn"
                                        onClick={() => handlePitchDelete(pitch._id)}
                                    >
                                        <FontAwesomeIcon icon={faTrash} /> Delete
                                    </button>
                                </div>
                            </div>
                        ))}
                    </div>
                )}

                <h3>Add New Pitch</h3>
                <form onSubmit={handleSubmitPitch(onSubmitPitch)} className="add-pitch-form">
                    <div className="form-group">
                        <label htmlFor="name">Name:</label>
                        <input
                            type="text"
                            id="name"
                            {...registerPitch("name", { required: true })}
                        />
                        {pitchErrors.name && <span className="error-message">This field is required</span>}
                    </div>
                    <div className="form-group">
                        <label htmlFor="location">Location:</label>
                        <input type="text" id="location" {...registerPitch("location")} />
                    </div>
                    <div className="form-group">
                        <label htmlFor="PitchType">Pitch Type:</label>
                        <input type="text" id="PitchType" {...registerPitch("PitchType")} />
                    </div>
                    <button type="submit" className="add-btn">
                        Add Pitch
                    </button>
                </form>

                <Modal
                    isOpen={!!editingPitch}
                    onRequestClose={() => {
                        setEditingPitch(null);
                        resetPitch();
                    }}
                    contentLabel="Edit Pitch"
                    className="modal"
                    overlayClassName="modal-overlay"
                >
                    <h3>Edit Pitch</h3>
                    <form onSubmit={handleSubmitPitch(handlePitchUpdate)} className="edit-pitch-form">
                        <div className="form-group">
                            <label htmlFor="name">Name:</label>
                            <input type="text" id="name" {...registerPitch("name")} />
                        </div>
                        <div className="form-group">
                            <label htmlFor="location">Location:</label>
                            <input type="text" id="location" {...registerPitch("location")} />
                        </div>
                        <div className="form-group">
                            <label htmlFor="PitchType">Pitch Type:</label>
                            <input type="text" id="PitchType" {...registerPitch("PitchType")} />
                        </div>
                        <button type="submit" className="update-btn">
                            Update Pitch
                        </button>
                        <button
                            type="button"
                            onClick={() => {
                                setEditingPitch(null);
                                resetPitch();
                            }}
                            className="cancel-btn"
                        >
                            Cancel
                        </button>
                    </form>
                </Modal>
            </section>

            <section className="bookings-section card">
                <h3>Bookings</h3>

                {bookingsLoading ? (
                    <div className="loading">
                        <FontAwesomeIcon icon={faSpinner} spin /> Loading bookings...
                    </div>
                ) : bookingsError ? (
                    <div className="error">Error loading bookings: {bookingsError.message}</div>
                ) : (
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
                                        <button onClick={() => handleBookingEdit(booking)} className="edit-btn">
                                            <FontAwesomeIcon icon={faEdit} /> Edit
                                        </button>
                                        <button
                                            className="delete-btn"
                                            onClick={() => handleBookingDelete(booking._id)}
                                        >
                                            <FontAwesomeIcon icon={faTrash} /> Delete
                                        </button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                )}

                <h3>Add New Booking</h3>
                <form onSubmit={handleSubmitBooking(onSubmitBooking)} className="add-booking-form">
                    <div className="form-group">
                        <label htmlFor="name">Name:</label>
                        <input
                            type="text"
                            id="name"
                            {...registerBooking("name", { required: true })}
                        />
                        {bookingErrors.name && <span className="error-message">This field is required</span>}
                    </div>
                    <div className="form-group">
                        <label htmlFor="pitch">Select Pitch:</label>
                        <select id="pitch" {...registerBooking("pitch")}>
                            {pitches.map((pitch) => (
                                <option key={pitch._id} value={pitch._id}>
                                    {pitch.name}
                                </option>
                            ))}
                        </select>
                    </div>
                    <div className="form-group">
                        <label htmlFor="date">Date:</label>
                        <input type="date" id="date" {...registerBooking("date")} />
                    </div>
                    <div className="form-group">
                        <label htmlFor="time">Time:</label>
                        <input type="time" id="time" {...registerBooking("time")} />
                    </div>
                    <button type="submit" className="add-btn">
                        Add Booking
                    </button>
                </form>

                <Modal
                    isOpen={!!editingBooking}
                    onRequestClose={() => {
                        setEditingBooking(null);
                        resetBooking();
                    }}
                    contentLabel="Edit Booking"
                    className="modal"
                    overlayClassName="modal-overlay"
                >
                    <h3>Edit Booking</h3>
                    <form onSubmit={handleSubmitBooking(handleBookingUpdate)} className="edit-booking-form">
                        <div className="form-group">
                            <label htmlFor="name">Name:</label>
                            <input type="text" id="name" {...registerBooking("name")} />
                        </div>
                        <div className="form-group">
                            <label htmlFor="pitch">Select Pitch:</label>
                            <select id="pitch" {...registerBooking("pitch")}>
                                {pitches.map((pitch) => (
                                    <option key={pitch._id} value={pitch._id}>
                                        {pitch.name}
                                    </option>
                                ))}
                            </select>
                        </div>
                        <div className="form-group">
                            <label htmlFor="date">Date:</label>
                            <input type="date" id="date" {...registerBooking("date")} />
                        </div>
                        <div className="form-group">
                            <label htmlFor="time">Time:</label>
                            <input type="time" id="time" {...registerBooking("time")} />
                        </div>
                        <button type="submit" className="update-btn">
                            Update Booking
                        </button>
                        <button
                            type="button"
                            onClick={() => {
                                setEditingBooking(null);
                                resetBooking();
                            }}
                            className="cancel-btn"
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