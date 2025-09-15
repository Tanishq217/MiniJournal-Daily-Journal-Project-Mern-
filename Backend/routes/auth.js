import express from "express";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import User from "../models/User.js";

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

export default router;

