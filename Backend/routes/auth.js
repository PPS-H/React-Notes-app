require("dotenv").config();
const express = require("express");
const User = require("../models/User");
const { body, validationResult } = require("express-validator");
const router = express.Router();
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const fetchUser = require("../middleware/fetchUser");
const JWT_SECRET = process.env.JWT_SECRET;

// ROUTE 1: Creating new user
router.post(
  "/createuser",
  [
    // Validations
    body("name", "Enter a valid name").isLength({ min: 3 }),
    body("email", "Enter a valid email address").isEmail(),
    body("password", "Password must be atleast 5 characters").isLength({
      min: 5,
    }),
  ],
  async (req, res) => {
    // If any error occured
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    try {
      // If user exists with the provided email the return
      let user = await User.findOne({ email: req.body.email });
      if (user)
        return res.status(400).json({ message: "Email is already in use" });

      // Creating hash for the user password
      const salt = bcrypt.genSaltSync(10);
      const hash = bcrypt.hashSync(req.body.password, salt);

      // Creating user
      user = await User.create({
        name: req.body.name,
        email: req.body.email,
        password: hash,
      });

      // Creating payload data for the jwt token
      const data = {
        user: {
          id: user.id,
        },
      };
      const authToken = jwt.sign(data, JWT_SECRET);
      res.json({ authToken });

      // const user = new User(req.body);
      // const savedUser = await user.save();
      // res.send(savedUser);
    } catch (error) {
      return res
        .status(400)
        .json({ message: "Some error occured!", error: error.message });
    }
  }
);

//ROUET 2: Login user
router.post(
  "/login",
  [
    // Validations
    body("email", "Enter a valid email address").isEmail(),
    body("password", "Password is required").exists(),
  ],
  async (req, res) => {
    // If any error occured
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    try {
      const { email, password } = req.body;
      // Checking if user exists
      let user = await User.findOne({ email });
      if (!user)
        return res
          .status(400)
          .json({ message: "Please enter valid creentials" });

      const passwordMatched = await bcrypt.compare(password, user.password);
      if (!passwordMatched) {
        return res
          .status(400)
          .json({ message: "Please enter valid creentials" });
      }
      // Creating payload data for the jwt token
      const data = {
        user: {
          id: user.id,
        },
      };
      const authToken = jwt.sign(data, JWT_SECRET);
      res.json({ authToken });

      // const user = new User(req.body);
      // const savedUser = await user.save();
      // res.send(savedUser);
    } catch (error) {
      return res
        .status(400)
        .json({ message: "Some error occured!", error: error.message });
    }
  }
);
//ROUET 3: Gettings user details
router.post("/getuser", fetchUser, async (req, res) => {
  const id = req.user.id;
  try {
    // Fetching all the user details except password 
    const user = await User.findById(id).select("-password");
    res.send(user);
  } catch (error) {
    return res.status(500).json({ message: "Internal server error" });
  }
});

module.exports = router;
