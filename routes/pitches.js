const router = require('express').Router();
let Pitch = require('../models/pitch.model');

router.route('/').get((req, res) => {
  Pitch.find()
    .then(pitches => res.json(pitches))
    .catch(err => res.status(400).json('Error: ' + err));
});

router.route('/add').post((req, res) => {
  const newPitch = new Pitch(req.body);

  newPitch.save()
    .then(() => res.json('Pitch added!'))
    .catch(err => res.status(400).json('Error: ' + err));
});

module.exports = router;