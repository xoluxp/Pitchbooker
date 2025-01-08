const router = require('express').Router();
let Booking = require('../models/booking.model');

router.route('/').get((req, res) => { 
  Booking.find()
    .then(bookings => res.json(bookings))
    .catch(err => res.status(400).json('Error: ' + err));
});

router.route('/').post((req, res) => {
  const newBooking = new Booking(req.body);

  newBooking.save()
    .then(() => res.json('Booking created!'))
    .catch(err => res.status(400).json('Error: ' + err));
});

module.exports = router;