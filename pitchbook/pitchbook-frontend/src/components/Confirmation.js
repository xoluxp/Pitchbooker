import React from 'react';
import { useLocation, Link } from 'react-router-dom';
import Header from './Header';
import Footer from './Footer'; 
import './Confirmation.css'; 

function Confirmation() {
    const location = useLocation();
    const bookingData = location.state?.bookingData;

    // Extract pitch details from bookingData
    const { pitchName, pitchLocation, pitchType } = bookingData || {};

    return (
        <div>
            <Header />
            <main className="confirmation-page"> {/* Added main tag for styling */}
                <section className="confirmation-section">
                    <h2>Booking Confirmation</h2>
                    {bookingData ? (
                        <div>
                            <p>
                                Thank you, <strong>{bookingData.name}</strong>! Your booking has been registered.
                            </p>
                            <p>Number of players: {bookingData.teammates}</p>
                            <center></center><p>Pitch: {pitchName}</p> 
                            <p>Location: {pitchLocation}</p> 
                            <p>Type: {pitchType}</p> 
                            <p>Date: {bookingData.date}</p>
                            <p>Time: {bookingData.time}</p>
                            <p><h3>Consider being 15 mins early to the pitch!!!</h3></p>
                        </div>
                    ) : (
                        <p>No booking data found.</p>
                    )}
                   <center> <Link to="/booking" className="book-another-button">Book Another Pitch</Link> </center> 
                </section>
            </main>
            <Footer />
        </div>
    );
}

export default Confirmation;