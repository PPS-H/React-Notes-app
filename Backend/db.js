const mongoose = require("mongoose");
const mongoURI = "mongodb+srv://ArjunSingh:P17IKsDx7bZJvkHo@arjuncodedrill.tf2c8jc.mongodb.net/Note";
const connection = () => {
  mongoose.connect(mongoURI);
};
module.exports = connection;
