import { runRAGPipeline } from "../rag/answerAgent.js";

export const generateAIResponse = async (query, profile) => {
  try {
    if (!query || query.trim().length === 0) {
      throw new Error("Query is empty.");
    }

    return await runRAGPipeline(query, profile);
  } catch (error) {
    console.error("AI Agent Error:", error.message);
    throw error;
  }
};
