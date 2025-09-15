import express from "express";
import dotenv from "dotenv";
import connectDB from "./config/db.js";
import entryRoutes from "./routes/entries.js";


dotenv.config();

const app = express();

// Middleware to parse JSON
app.use(express.json());

// Allow all origins for testing (optional for now)
app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  next();
});

// Connect to MongoDB
connectDB();

// Routes
app.use("/entries", entryRoutes);

// Default route
app.get("/", (req, res) => {
  res.send("Server is running!");
});

// Start server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
