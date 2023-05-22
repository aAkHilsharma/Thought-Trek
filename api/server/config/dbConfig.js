require('dotenv').config();
const mongoose = require('mongoose');

mongoose.connect(process.env.mongo_url);

const connection = mongoose.connection;

connection.on('connected', () => {
  console.log('MongoDB connected');
});
connection.on('error', (err) => {
  console.log('MongoDB connection error: ', err);
});

module.exports = mongoose;
