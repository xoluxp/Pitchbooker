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

// Add PUT route to update a booking
router.route('/:id').put((req, res) => {
  Booking.findById(req.params.id)
    .then(booking => {
      booking.name = req.body.name;
      booking.pitch = req.body.pitch;
      booking.date = Date.parse(req.body.date); // Parse the date string
      booking.time = req.body.time;
      // ... update other fields ...

      booking.save()
        .then(() => res.json('Booking updated!'))
        .catch(err => res.status(400).json('Error: ' + err));
    })
    .catch(err => res.status(400).json('Error: ' + err));
});

// Add DELETE route to delete a booking
router.route('/:id').delete((req, res) => {
  Booking.findByIdAndDelete(req.params.id)
    .then(() => res.json('Booking deleted.'))
    .catch(err => res.status(400).json('Error: ' + err));
});

/**  Add GET route to get a booking by ID
 router.route('/:id').get((req, res) => {
  Booking.findById(req.params.id)
    .then(booking => res.json(booking))
    .catch(err => res.status(400).json('Error: ' + err));
}); **/

module.exports = router;