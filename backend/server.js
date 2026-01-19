import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import { connectDB } from "./db.js";
import askRoute from "./routes/ask.js";
import feedbackRoute from "./routes/feedback.js";

dotenv.config();
connectDB();

const app = express();

app.use(cors({
  origin: "http://localhost:5173",
  methods: ["GET", "POST"],
  credentials: true
}));

app.use(express.json());

app.get("/", (req, res) => {
  res.send("YogAI Backend is running");
});

app.use("/ask", askRoute);
app.use("/feedback", feedbackRoute);

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log("YogAI Backend running on port", PORT);
});
