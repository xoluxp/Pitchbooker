const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const bookingSchema = new Schema(
    {
        name: { type: String, required: true },
        pitch: { type: String, required: true },
        date: { type: Date, required: true },
        time: { type: String, required: true },
    },
    {
        timestamps: true,
    }
);

const Booking = mongoose.model("Booking", bookingSchema);

module.exports = Booking;