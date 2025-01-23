const router = require('express').Router();
const jwt = require('jsonwebtoken'); // Import jsonwebtoken
const bcrypt = require('bcrypt'); // Import bcrypt for password hashing
let User = require('../models/user.model');


// Middleware to authenticate JWT
const authenticateJWT = (req, res, next) => {
  const token = req.headers.authorization?.split(' ')[1];

  if (token) {
    jwt.verify(token, process.env.JWT_SECRET, (err, user) => { // Use JWT_SECRET from .env
      if (err) {
        return res.sendStatus(403);
      }
      req.user = user;
      next();
    });
  } else {
    res.sendStatus(401);
  }
};

// a temporary backend route to test the authentication, and generate a user and password for the admin.
router.route('/register').post(async (req, res) => {
  const { username, password, isAdmin } = req.body;

  try {
    const hashedPassword = await bcrypt.hash(password, 10); // Hash the password

    const newUser = new User({
      username,
      password: hashedPassword, // Store the hashed password
      isAdmin // Set isAdmin based on request body
    });

    const savedUser = await newUser.save();
    res.json(savedUser);
  } catch (error) {
    res.status(400).json({ message: error.message }); // Send error message
  }
});

router.route('/me').get(authenticateJWT, (req, res) => {
  res.json(req.user);
});

router.route('/login').post(async (req, res) => {
   const { username, password } = req.body;
 
   try {
     const user = await User.findOne({ username });
     if (user) {
       const validPassword = await bcrypt.compare(password, user.password); // Compare passwords
       if (validPassword) {
         // Generate JWT
         const accessToken = jwt.sign({ 
           username: user.username, 
           id: user._id,
           isAdmin: user.isAdmin // Include isAdmin in the token payload
         }, process.env.JWT_SECRET);
         res.json({ accessToken });
       } else {
         res.status(400).json({ message: 'Invalid password' });
       }
     } else {
       res.status(400).json({ message: 'User not found' });
     }
   } catch (error) {
     res.status(500).json({ message: 'Server error' });
   }
 });

module.exports = router;