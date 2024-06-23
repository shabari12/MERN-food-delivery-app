// Import necessary modules and setup server

import express from "express";
import cors from "cors";
import { connectDB } from "./config/db.js";
import foodRouter from "./routes/foodRoute.js";
import userRouter from "./routes/userRoute.js";
import cartRouter from "./routes/cartRoute.js"; // Import cartRouter
import dotenv from "dotenv";
import orderRouter from "./routes/orderRoute.js";
dotenv.config();

// Initialize express app
const app = express();
const PORT =  process.env.PORT || 4000;

// Middleware setup
app.use(express.json()); // Call express.json() as a function
app.use(cors());

// Database connection
connectDB();

// API Endpoints
app.use("/api/food", foodRouter);
app.use("/images", express.static("uploads"));
app.use("/api/user", userRouter);
app.use("/api/cart", cartRouter);
app.use('/api/order',orderRouter)

// Default route
app.get("/", (req, res) => {
  res.send("API Working");
});

// Server startup
app.listen(PORT, () => {
  console.log("Server is running on port", PORT);
});
