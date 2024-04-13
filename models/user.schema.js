const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  googleLoginId: {
    type: String,
  },
  profilePhoto: {
    type: String,
    default: '',
  },
  password: {
    type: String,
  },
  mobileNumber: {
    type: Number,
  },
  isGoogleLogin: {
    type: Boolean,
    required: true,
    default: false,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

// Create the User model
const User = mongoose.model('User', userSchema);

// Export the User model
module.exports = User;
