const express = require('express');
const User = require('../models/Users');
const router = express.Router();
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');

router.post('/', async (req, res) => {
    try {
      const { email, password, firstname, lastname, phone, address } = req.body;
      
      // Validate input
      if (!email || !password || !firstname || !lastname) {
        return res.status(400).json({ message: 'Please fill all the required fields' });
      }
      
      // User model should be imported from your models
      //const User = mongoose.model('User');
      
      // Check if user already exists
      const existingUser = await User.findOne({email});
      if (existingUser) {
        return res.status(400).json({ message: 'User with this email already exists' });
      }
      
      // Hash password
      const salt = await bcrypt.genSalt(10);
      const hashedPassword = await bcrypt.hash(password, salt);
      
      // Create new user
      const user = new User({
        email,
        password: hashedPassword,
        firstname,
        lastname,
        phone: phone || '',
        address: address || ''
      });
      
      await user.save();
      
      // Create and sign JWT token
      const token = jwt.sign(
        { userId: user._id, email: user.email },
        process.env.JWT_SECRET,
        { expiresIn: '24h' }
      );
      
      // Send response
      res.status(201).json({
        id: user._id,
        email: user.email,
        firstname: user.firstname,
        lastname: user.lastname,
        phone: user.phone,
        address: user.address,
        token
      });
      
    } catch (error) {
      console.error('Registration error:', error);
      res.status(500).json({ message: 'Server error' });
    }
  });

  module.exports = router;