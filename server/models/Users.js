const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true }, // Store hashed passwords
    firstname: { type: String, required: true },
    lastname: { type: String, required: true },
    phone: { type: String, default: "" }, 
    address: { type: String, default: "" }, 
    role: { type: String, enum: ['admin', 'user'], default: 'user' } // Role management
}, { timestamps: true  // Adds createdAt and updatedAt fields
});

module.exports = mongoose.model('User', userSchema);