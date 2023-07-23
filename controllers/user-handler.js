const User = require('../models/user.schema');
const jwt = require('jsonwebtoken');
const loginHandler = async (req, res) => {
  try {
    const { email, password } = req.body;
    if (!email || !password) {
      res.json({ message: 'Fill all the details' });
      return;
    }
    const isUser = await User.findOne({ email, password });
    if (isUser) {
      const token = jwt.sign({ userId: isUser._id }, process.env.JWT_SECRET);
      res.cookie('token', token, { maxAge: 900000, httpOnly: true });
      req.session.userId = token;
      res.json(isUser);
    } else {
      res.json({ message: 'User not exist' });
    }
  } catch (err) {
    res.status(501).json({ message: err });
    console.log(err);
  }
};

const signupHandler = async (req, res) => {
  try {
    const { name, email, mobileNumber, password } = req.body;
    if (!name || !email || !mobileNumber || !password) {
      res.status(400).json({ message: 'Please enter all the details' });
      return;
    }
    const newUser = new User({
      name,
      email,
      mobileNumber,
      password,
    });
    const savedUser = await newUser.save();
    res.status(201).json(savedUser);
  } catch (err) {
    res.status(501).json({ message: err });
    console.log(err);
  }
};
const getUsersHandler = async (req, res) => {
  try {
    const users = await User.find({});
    res.json(users);
  } catch (err) {
    res.status(501).json({ message: err });
  }
};
module.exports = { signupHandler, loginHandler, getUsersHandler };
