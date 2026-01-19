import express from "express";

const router = express.Router();

router.post("/", (req, res) => {
  res.json({ status: "Feedback recorded successfully" });
});

export default router;
