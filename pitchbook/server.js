const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
require('dotenv').config();

const app = express();
const port = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

// Connect to MongoDB Atlas
const uri = process.env.ATLAS_URI;
mongoose.connect(uri, { useNewUrlParser: true, useUnifiedTopology: true });
const connection = mongoose.connection;
connection.once('open', () => {
  console.log("MongoDB database connection established successfully");
});

const pitchesRouter = require('./routes/pitches');
app.use('/pitches', pitchesRouter);

const bookingsRouter = require('./routes/bookings');
app.use('/bookings', bookingsRouter); // Define the /bookings route

const usersRouter = require('./routes/users'); // Assuming you'll create users.js
app.use('/api/users', usersRouter);

// Start the server
app.listen(port, () => {
  console.log(`Server is running on port: ${port}`);
});