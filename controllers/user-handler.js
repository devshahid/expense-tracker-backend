const User = require('../models/user.schema');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
class UserHandler {
  async loginHandler(req, res) {
    try {
      const { email, password, isGoogleLogin, googleLoginId } = req.body;
      if (!isGoogleLogin) {
        if (!email || !password) {
          res.json({ message: 'Fill all the details' });
          return;
        }
        const isUser = await User.findOne({ email });
        const match = await bcrypt.compare(password, isUser.password);
        if (match) {
          const token = jwt.sign({ userId: isUser._id }, process.env.JWT_SECRET);
          req.session.userId = token;
          res.json(token);
        } else {
          res.json({ message: 'User not exist' });
        }
      } else {
        if (!email || !googleLoginId) {
          res.json({ message: 'Required fields are empty' });
          return;
        }
        const isUser = await User.findOne({ email, googleLoginId });
        if (isUser) {
          const token = jwt.sign({ userId: isUser._id }, process.env.JWT_SECRET);
          req.session.userId = token;
          res.json(token);
        } else {
          res.json({ message: 'User not exist' });
        }
      }
    } catch (err) {
      res.status(501).json({ message: err });
      console.log(err);
    }
  }
  async signupHandler(req, res) {
    try {
      const { name, email, mobileNumber, password } = req.body;
      if (!name || !email || !mobileNumber || !password) {
        res.status(400).json({ message: 'Please enter all the details' });
        return;
      }
      const encryptedPassword = await bcrypt.hash(password, 10);
      const newUser = new User({
        name,
        email,
        mobileNumber,
        password: encryptedPassword,
      });
      const savedUser = await newUser.save();
      res.status(201).json(savedUser);
    } catch (err) {
      res.status(501).json({ message: err });
      console.log(err);
    }
  }
  async getUsersHandler(req, res) {
    try {
      const users = await User.find({});
      res.json(users);
    } catch (err) {
      res.status(501).json({ message: err });
    }
  }
}
module.exports = new UserHandler();
