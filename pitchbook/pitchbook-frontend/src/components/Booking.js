// Booking.js
import React, { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import "./Booking.css";
import Header from "./Header";
import Footer from "./Footer";

function Booking() {
    const { register, handleSubmit, formState: { errors } } = useForm();
    const [pitches, setPitches] = useState([]);
    const [bookingConfirmed, setBookingConfirmed] = useState(false);
    const navigate = useNavigate();

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
            const now = new Date();
            const [year, month, day] = data.date.split("-");
            const [hours, minutes] = data.time.split(":");
            const bookingDateTime = new Date(year, month - 1, day, hours, minutes);

            if (bookingDateTime <= now) {
                alert("Cannot book on past date and time.");
                return;
            }

            const response = await axios.post("http://localhost:5000/bookings/add", data);

            console.log(response.data);
            setBookingConfirmed(true);

            try {
                const updatedPitchesResponse = await axios.get("http://localhost:5000/pitches");
                setPitches(updatedPitchesResponse.data);
            } catch (error) {
                console.error("Error fetching updated pitches:", error);
            }

            setTimeout(() => {
                const bookedPitch = pitches.find(pitch => pitch._id === data.pitch);
                if (bookedPitch) {
                    navigate('/confirmation', {
                        state: {
                            bookingData: {
                                ...data,
                                pitchName: bookedPitch.name,
                                pitchLocation: bookedPitch.location,
                                pitchType: bookedPitch.PitchType
                            }
                        }
                    });
                } else {
                    console.error('Booked pitch not found');
                    alert('Error finding pitch details. Please try again later.');
                }
            }, 2000);

        } catch (error) {
            console.error('Booking error:', error);
            alert('Error creating booking. Please try again later.');
        }
    };

    return (
        <div>
            <Header />

            <main className="booking-page"> {/* Added main tag for styling */}
                <section className="booking-section">
                    <h2>Book a Pitch</h2>
                    <p>Find the perfect pitch for your next game.</p> {/* Added introductory text */}

                    {bookingConfirmed && (
                        <div className="booking-confirmation">
                            Booking confirmed! You will be redirected shortly...
                        </div>
                    )}

                    <form onSubmit={handleSubmit(onSubmit)} className="booking-form">
                        <div className="form-field">
                            <label htmlFor="name">Your Name:</label>
                            <input type="text" id="name" {...register('name', { required: true })} />
                            {errors.name && <span className="error-message">This field is required</span>}
                        </div>

                        <div className="form-field">
                            <label htmlFor="teammates">Number of Players:</label>
                            <input type="number" id="teammates" min="0" {...register('teammates')} />
                        </div>

                        <div className="form-field">
                            <label htmlFor="pitch">Select Pitch:</label>
                            <select id="pitch" {...register('pitch', { required: true })}>
                                <option value="">Select a pitch</option>
                                {pitches.map(pitch => (
                                    <option key={pitch._id} value={pitch._id}>{pitch.name}</option>
                                ))}
                            </select>
                            {errors.pitch && <span className="error-message">This field is required</span>}
                        </div>

                        <div className="form-field">
                            <label htmlFor="date">Date:</label>
                            <input type="date" id="date" {...register('date', { required: true })} />
                            {errors.date && <span className="error-message">This field is required</span>}
                        </div>

                        <div className="form-field">
                            <label htmlFor="time">Time:</label>
                            <input type="time" id="time" {...register('time', { required: true })} step="3600" />
                            {errors.time && <span className="error-message">This field is required</span>}
                        </div>

                        <button type="submit" className="book-now-button">Book Now</button>
                    </form>
                </section>
            </main>

            <Footer />
        </div>
    );
}

export default Booking;