const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const pitchSchema = new Schema({
  name: { type: String, required: true },
  location: { type: String, required: true },
  // We'll add more fields later
}, {
  timestamps: true,
});

const Pitch = mongoose.model('Pitch', pitchSchema);
module.exports = Pitch;