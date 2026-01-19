import express from "express";
import QueryLog from "../models/QueryLog.js";
import { safetyCheck } from "../agents/safetyAgent.js";
import { calculateConfidence } from "../agents/confidenceAgent.js";
import { generateAIResponse } from "../agents/aiAgent.js";

const router = express.Router();

router.post("/", async (req, res) => {
  try {
    const { query, profile, sessionId } = req.body;

    if (!query || query.trim().length === 0) {
      return res.status(400).json({ error: "Query is required" });
    }

    const safety = safetyCheck(query);
    const ai = await generateAIResponse(query, profile);
    const confidence = calculateConfidence(ai.sources.length);

    const log = new QueryLog({
      sessionId,
      profile,
      query,
      answer: ai.answer,
      confidence,
      sources: ai.sources,
      isUnsafe: safety.isUnsafe,
      riskLevel: safety.riskLevel
    });

    await log.save();

    res.json({
      answer: ai.answer,
      sources: ai.sources,
      confidence,
      isUnsafe: safety.isUnsafe,
      riskLevel: safety.riskLevel
    });

  } catch (err) {
    console.error("ASK ROUTE ERROR:", err.message);
    res.status(500).json({ error: err.message });
  }
});

export default router;
