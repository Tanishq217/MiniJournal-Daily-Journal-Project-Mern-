import express from "express";
import Entry from "../models/Entry.js";

const router = express.Router();

// Create entry
router.post("/", async (req, res) => {
  try {
    const { userId, date, content } = req.body;
    if (!date || !content) {
      return res.status(400).json({ error: "date and content required" });
    }

    const entry = new Entry({ userId, date, content });
    await entry.save();

    res.status(201).json(entry);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Get all entries sorted by newest first
router.get("/", async (req, res) => {
  try {
    const entries = await Entry.find().sort({ date: -1 });
    res.json(entries);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Update an entry
router.patch("/:id", async (req, res) => {
  try {
    const entry = await Entry.findByIdAndUpdate(
      req.params.id,
      { content: req.body.content },
      { new: true }
    );
    res.json(entry);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Delete an entry
router.delete("/:id", async (req, res) => {
  try {
    await Entry.findByIdAndDelete(req.params.id);
    res.json({ message: "Entry deleted" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

export default router;
