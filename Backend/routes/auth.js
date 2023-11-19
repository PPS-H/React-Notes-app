const express = require("express");
const User = require("../models/User");
const router = express.Router();


router.post("/", async (req, res) => {
  console.log(req.body);
  try {
    const user = new User(req.body);
    const savedUser = await user.save();
    res.send(savedUser);
  } catch (error) {
    console.error("Error saving user:", error);
    res.status(500).send("Error saving user");
  }

  //res.send(req.body);
});

module.exports = router;
