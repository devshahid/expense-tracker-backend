const mongoose = require('mongoose');
const DATABASE =
  process.env.NODE_ENV === 'development' ? process.env.DEV_DATABASE : process.env.PROD_DATABASE;
const URL =
  process.env.NODE_ENV === 'development'
    ? `${process.env.DEV_MONGO_URL}${DATABASE}`
    : `${process.env.PROD_MONGO_URL}${DATABASE}`;
console.log(DATABASE, URL);
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
