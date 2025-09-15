// routes/entries.js
import express from "express";
import Entry from "../models/Entry.js";

const router = express.Router();

// Create entry
router.post("/", async (req, res) => {
  try {
    const { userId, date, content } = req.body;
    if (!date || !content) return res.status(400).json({ error: "date and content required" });

    const entry = new Entry({ userId, date, content });
    await entry.save();
    res.status(201).json(entry);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Get all entries
router.get("/", async (req, res) => {
  try {
    const entries = await Entry.find().sort({ date: -1 });
    res.json(entries);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Update entry
router.patch("/:id", async (req, res) => {
  try {
    const updates = req.body;
    const updated = await Entry.findByIdAndUpdate(req.params.id, updates, { new: true });
    if (!updated) return res.status(404).json({ error: "Entry not found" });
    res.json(updated);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Delete entry
router.delete("/:id", async (req, res) => {
  try {
    const deleted = await Entry.findByIdAndDelete(req.params.id);
    if (!deleted) return res.status(404).json({ error: "Entry not found" });
    res.json({ message: "Entry deleted" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

export default router;
