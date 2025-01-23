const router = require("express").Router();
let Pitch = require("../models/pitch.model");

router.route("/").get((req, res) => {
    Pitch.find()
        .then((pitches) => res.json(pitches))
        .catch((err) => res.status(400).json("Error: " + err));
});

router.route("/add").post((req, res) => {
    const name = req.body.name;
    const location = req.body.location;
    const PitchType = req.body.PitchType;

    const newPitch = new Pitch({
        name,
        location,
        PitchType,
    });

    newPitch
        .save()
        .then(() => res.json("Pitch added!"))
        .catch((err) => res.status(400).json("Error: " + err));
});

router.route("/:id").get((req, res) => {
    Pitch.findById(req.params.id)
        .then((pitch) => res.json(pitch))
        .catch((err) => res.status(400).json("Error: " + err));
});

router.route("/:id").delete((req, res) => {
    Pitch.findByIdAndDelete(req.params.id)
        .then(() => res.json("Pitch deleted."))
        .catch((err) => res.status(400).json("Error: " + err));
});

router.route("/update/:id").post((req, res) => {
    Pitch.findById(req.params.id)
        .then((pitch) => {
            pitch.name = req.body.name;
            pitch.location = req.body.location;
            pitch.PitchType = req.body.PitchType;

            pitch
                .save()
                .then(() => res.json("Pitch updated!"))
                .catch((err) => res.status(400).json("Error: " + err));
        })
        .catch((err) => res.status(400).json("Error: " + err));
});

module.exports = router;