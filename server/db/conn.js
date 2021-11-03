const mongoose = require('mongoose');
require('dotenv').config();
const DB = process.env.DB;

const connectToDB = () => {
  mongoose
    .connect(DB, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    })
    .then(console.log('Connected to MongoDB'))
    .catch((err) => console.error(err));
};


module.exports = connectToDB;