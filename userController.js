const { check, validationResult } = require('express-validator');
const bcrypt = require('bcrypt');
const User = require('../models/User'); // Ensure this path is correct

// Render the Home Page
exports.renderHomePage = (req, res) => {
  res.render('../views/index.ejs'); // Ensure 'home.ejs' exists in your 'views' directory
};

// Render the About Page
exports.renderAboutPage = (req, res) => {
  res.render('../views/about.ejs'); // Ensure 'about.ejs' exists in your 'views' directory
};

// Register User
exports.registerUser = [
  // Validation rules
  check('firstname').not().isEmpty().withMessage('First name is required'),
  check('lastname').not().isEmpty().withMessage('Last name is required'),
  check('email').isEmail().withMessage('Enter a valid email'),
  check('password').isLength({ min: 6 }).withMessage('Password must be at least 6 characters long'),

  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { firstname, lastname, email, password, confirmPassword } = req.body;

    if (password !== confirmPassword) {
      return res.status(400).json({ error: 'Passwords do not match' });
    }

    try {
      // Check if user already exists
      const existingUser = await User.findOne({ email });
      if (existingUser) {
        return res.status(400).json({ error: 'Email already exists' });
      }

      // Hash the password
      const salt = await bcrypt.genSalt(10);
      const hashedPassword = await bcrypt.hash(password, salt);

      // Create a new user
      const user = new User({
        firstname,
        lastname,
        email,
        password: hashedPassword,
      });

      // Save the user to the database
      await user.save();
      res.status(201).json({ message: 'User registered successfully' });
    } catch (error) {
      console.error('Error during registration:', error);
      res.status(500).json({ error: 'Server error, please try again later' });
    }
  }
];
