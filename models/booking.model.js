const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const bookingSchema = new Schema({
  name: { type: String, required: true },
  teammates: { type: Number },
  pitch: { type: Schema.Types.ObjectId, ref: 'Pitch', required: true },
  date: { type: Date, required: true },
  time: { type: String, required: true }
  // ... other fields as needed ...
}, {
  timestamps: true,
});

const Booking = mongoose.model('Booking', bookingSchema);
module.exports = Booking;