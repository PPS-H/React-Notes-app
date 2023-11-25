const express = require("express");
const Note = require("../models/Note");
const { body, validationResult } = require("express-validator");
const router = express.Router();
const fetchUser = require("../middleware/fetchUser");

// ROUTE 1: Fetching all notes
router.get("/getallnotes", fetchUser, async (req, res) => {
  try {
    const notes = await Note.find({ user: req.user.id });
    res.json(notes);
  } catch (error) {
    res.status(500).send("Internal server");
  }
});

router.post(
  "/addnote",
  fetchUser,
  [
    // Validations
    body("title", "Title must be atleast 5 characters").isLength({ min: 3 }),
    body("description", "Description must be atleast 5 characters").isLength({
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
      const { title, description, tag } = req.body;
      const note = new Note({
        title: title,
        description: description,
        tag: tag,
        user: req.user.id,
      });
      const savedNote = await note.save();
      res.json(savedNote);
    } catch (error) {
      res.status(500).send("Internal server");
    }
  }
);
router.put(
  "/updatenote/:id",
  fetchUser,
  [
    // Validations
    body("title", "Title must be atleast 5 characters").isLength({ min: 3 }),
    body("description", "Description must be atleast 5 characters").isLength({
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
      const { title, description, tags } = req.body;
      const note = await Note.findById(req.params.id);
      if (!note) res.status(404).send("Not found !");

      if (note.user.toString() !== req.user.id)
        res.status(404).send("Not found !");
      const newNote = {};
      if (title) newNote.title = title;
      if (description) newNote.description = description;
      if (tags) newNote.tags = tags;

      const updatedNote = await Note.findByIdAndUpdate(
        req.params.id,
        { $set: newNote },
        { new: true }
      );
      res.json(updatedNote);
    } catch (error) {
      res.status(500).send("Internal server");
    }
  }
);

router.delete("/deletenote/:id", fetchUser, async (req, res) => {
  try {
    const note = await Note.findById(req.params.id);
    if (!note) res.status(404).send("Not found !");

    if (note.user.toString() !== req.user.id)
      res.status(404).send("Not found !");
    const updatedNote = await Note.findByIdAndDelete(req.params.id);
    res.status(200).send({ Success: "Note has been deleted !" });
  } catch (error) {
    res.status(500).send("Internal server");
  }
});

module.exports = router;
