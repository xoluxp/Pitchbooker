import React, { useState, useEffect } from 'react';
import axios from 'axios';

function PitchList() {
  const [pitches, setPitches] = useState([]);

  useEffect(() => {
    // Fetch pitches from the backend API when the component mounts
    axios.get('http://localhost:5000/pitches')
      .then(response => {
        setPitches(response.data);
      })
      .catch(error => {
        console.error('Error fetching pitches:', error);
      });
  }, []); // Empty dependency array ensures this runs only once on mount

  return (
    <div>
      <h2>Available Pitches</h2>
      <ul>
        {pitches.map(pitch => (
          <li key={pitch._id}>
            <h3>{pitch.name}</h3>
            <p>{pitch.location}</p>
            {/* Add more pitch details here */}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default PitchList;