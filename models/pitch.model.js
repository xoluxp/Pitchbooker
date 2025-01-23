const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const pitchSchema = new Schema(
    {
        name: { type: String, required: true },
        location: { type: String, required: true },
        PitchType: { type: String, required: true },
    },
    {
        timestamps: true,
    }
);

const Pitch = mongoose.model("Pitch", pitchSchema);

module.exports = Pitch;