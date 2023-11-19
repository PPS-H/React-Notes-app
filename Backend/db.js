require('dotenv').config()
const mongoose = require("mongoose");
const mongoURI = process.env.MONGODB_CONNCETION_STRING;
console.log(mongoURI)
const connection = () => {
  mongoose.connect(mongoURI);
};
module.exports = connection;
