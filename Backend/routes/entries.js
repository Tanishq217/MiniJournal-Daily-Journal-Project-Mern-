import express from "express";
import Entry from "../models/Entry.js";

const router = express.Router();

router.post("/", async (req, res) => {
  console.log("BODY RECEIVED:", req.body);

  if (!req.body) return res.status(400).json({ error: "Request body missing" });

  const { userId, date, content } = req.body;

  if (!date || !content) {
    return res.status(400).json({ error: "date and content required" });
  }

  try {
    const entry = new Entry({ userId, date, content });
    await entry.save();

    res.status(201).json({
      id: entry._id,
      date: entry.date,
      content: entry.content
    });
  } catch (error) {
    console.error("POST /entries ERROR:", error);
    res.status(500).json({ error: error.message });
  }
});



router.get("/", async (req, res) => {
  try {
    const entries = await Entry.find().sort({ date: -1 });

    const response = entries.map(entry => ({
      id: entry._id,
      date: entry.date,
      content: entry.content
    }));

    res.json(response);
  } catch (error) {
    console.error("GET /entries ERROR:", error);
    res.status(500).json({ error: error.message });
  }
});



router.patch("/:id", async (req, res) => {
  const { content } = req.body;
  if (!content) return res.status(400).json({ error: "Content is required" });

  try {
    const entry = await Entry.findByIdAndUpdate(
      req.params.id,
      { content },
      { new: true }
    );

    if (!entry) return res.status(404).json({ error: "Entry not found" });

    res.json({
      id: entry._id,
      date: entry.date,
      content: entry.content
    });
  } catch (error) {
    console.error("PATCH /entries/:id ERROR:", error);
    res.status(500).json({ error: error.message });
  }
});


router.delete("/:id", async (req, res) => {
  try {
    const entry = await Entry.findByIdAndDelete(req.params.id);
    if (!entry) return res.status(404).json({ error: "Entry not found" });

    res.json({ message: "Entry deleted successfully" });
  } catch (error) {
    console.error("DELETE /entries/:id ERROR:", error);
    res.status(500).json({ error: error.message });
  }
});

export default router;
