const User = require('../models/user.schema');
const jwt = require('jsonwebtoken');

const { encryptPassword, comparePassword } = require('../utils/encrypt');
class UserHandler {
  async loginHandler(req, res) {
    try {
      const { email, password, isGoogleLogin, googleLoginId, name } = req.body;
      console.log('reqbody => ', req.body);
      if (!isGoogleLogin) {
        if (!email || !password) {
          res.json({ message: 'Fill all the details' });
          return;
        }
        const isUser = await User.findOne({ email });
        const match = await comparePassword(isUser.password, password);
        if (match) {
          const token = jwt.sign({ userId: isUser._id }, process.env.JWT_SECRET);
          req.session.userId = token;
          return res.json({ token, userId: isUser._id });
        } else {
          return res.status(401).json({ message: 'User not exist' });
        }
      } else {
        if (!email || !googleLoginId) {
          return res.json({ message: 'Required fields are empty' });
        }
        const isUser = await User.findOne({ email, googleLoginId });
        if (isUser) {
          const token = jwt.sign({ userId: isUser._id }, process.env.JWT_SECRET);
          req.session.userId = token;
          return res.json({ token, userId: isUser._id });
        } else {
          const newUser = new User({
            name,
            email,
            googleLoginId,
            isGoogleLogin,
          });
          const savedUser = await newUser.save();
          console.log('savedUser => ', savedUser);
          return res
            .status(201)
            .json({ status: true, msg: 'User created successfully', userData: savedUser });
        }
      }
    } catch (err) {
      console.log('login duplicate value => ', err);
      return res.status(501).json({ message: err });
    }
  }
  async signupHandler(req, res) {
    try {
      console.log('req body => ', req.body);
      const { name, email, mobileNumber, password } = req.body;
      if (!name || !email || !mobileNumber || !password) {
        return res.status(400).json({ message: 'Please enter all the details' });
      }
      const hashedPassword = await encryptPassword(password);
      const newUser = new User({
        name,
        email,
        mobileNumber,
        password: hashedPassword,
      });
      const savedUser = await newUser.save();
      if (savedUser) {
        return res
          .status(201)
          .json({ status: true, message: 'User created successfully', userData: savedUser });
      } else {
        return res
          .status(501)
          .json({ status: false, message: 'Something went wrong while creating account' });
      }
    } catch (err) {
      console.log('sign up duplicate value => ', err);
      return res.status(501).json({ status: false, message: err });
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
  async logoutHandler(req, res) {
    try {
      delete req.session.userId; // remove session variable userId from server side when user logs out
      res.json({ status: true, msg: 'Log Out Successfully' });
    } catch (error) {
      console.log(error);
      res.status(500).json({ status: false, msg: 'Something went wrong' });
    }
  }
}
module.exports = new UserHandler();
