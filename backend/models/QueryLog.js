import mongoose from "mongoose";

const QuerySchema = new mongoose.Schema({
  sessionId: String,
  profile: String,
  query: String,
  answer: String,
  confidence: Number,
  sources: [String],
  isUnsafe: Boolean,
  riskLevel: String,
  timestamp: {
    type: Date,
    default: Date.now
  }
});

export default mongoose.model("QueryLog", QuerySchema);
