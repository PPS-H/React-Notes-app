require('dotenv').config()
const mongoose = require("mongoose");
const mongoURI = process.env.MONGODB_CONNCETION_STRING;

const connection = () => {
  mongoose.connect(mongoURI);
};
module.exports = connection;
