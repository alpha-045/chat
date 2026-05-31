import dotenv from "dotenv";
dotenv.config();

import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";

import authRoutes from "./routes/auth.route.js";
import messageRoutes from "./routes/message.route.js";
import { connectDB } from "./lib/db.js";

const app = express();

/* ✅ 1. CORS FIRST */
app.use(
  cors({
    origin: "http://localhost:5173",
    credentials: true,
  }),
);

/* ✅ 2. BODY PARSERS */
app.use(express.json({ limit: "10mb" })); // مهم لحل 413
app.use(express.urlencoded({ extended: true, limit: "10mb" }));

/* ✅ 3. COOKIE PARSER */
app.use(cookieParser());

/* ✅ 4. ROUTES */
app.use("/api/auth", authRoutes);
app.use("/api/message", messageRoutes);

const PORT = process.env.PORT || 5001;

app.listen(PORT, () => {
  console.log("server is running on port", PORT);
  connectDB();
});
