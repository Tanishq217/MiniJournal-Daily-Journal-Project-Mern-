import express from "express";
import dotenv from "dotenv";
import connectDB from "./config/db.js";
import entryRoutes from "./routes/entries.js";

dotenv.config();

const app = express();
app.use(express.json())


app.use(express.json());


app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  next();
});


app.use("/entries", entryRoutes);


app.get("/", (req, res) => {
  res.send("Server is running!");
});


const PORT = process.env.PORT || 5001;

const startServer = async () => {
  try {
    await connectDB(); 
    app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
  } catch (error) {
    console.error("Error starting server:", error);
  }
};

startServer();
