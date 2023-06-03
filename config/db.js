const mongoose = require('mongoose');
const DATABASE = process.env.DATABASE;
const URL = `${process.env.URL}${DATABASE}`;

const connectDB = async () => {
  try {
    await mongoose.connect(URL, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log('Database connected');
  } catch (error) {
    console.log('Database connection failed ', error);
    throw error;
  }
};

module.exports = connectDB;
