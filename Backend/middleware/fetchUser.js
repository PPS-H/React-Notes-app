require("dotenv").config();
require("dotenv").config();
const jwt = require("jsonwebtoken");
const JWT_SECRET = process.env.JWT_SECRET;

const fetchUser = (req, res, next) => {
  const token = req.header("auth-token");

  try {
    // This will return the payload data from where we can find the user id which we have set while generating the jwt token 
    const data = jwt.verify(token, JWT_SECRET);
    req.user=data.user;
  } catch (error) {
    return res
      .status(401)
      .json({ message: "Please authenticate with a valid token" });
  }
  // This will invoke the next function in the middlewares list ==> (req,res)={} function  of router /getUser (in our case)
  next();
};

module.exports = fetchUser;
