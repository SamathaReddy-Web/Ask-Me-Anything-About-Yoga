import { useState } from "react";
import { askAI } from "../api";
import VoiceInput from "./VoiceInput";
import ConfidenceMeter from "./ConfidenceMeter";
import SafetyAlert from "./SafetyAlert";
import ExplainPanel from "./ExplainPanel";

export default function ChatBox({ history, setHistory }) {
  const [query, setQuery] = useState("");
  const [response, setResponse] = useState(null);
  const [loading, setLoading] = useState(false);
  const sessionId = crypto.randomUUID();

  const ask = async () => {
    if (!query.trim()) return;

    setLoading(true);
    const data = await askAI(query, "intermediate", sessionId);
    setResponse(data);
    setHistory([{ query, answer: data.answer }, ...history]);
    setLoading(false);
  };

  return (
    <div className="max-w-2xl mx-auto bg-white dark:bg-gray-900 p-6 rounded-lg border border-gray-200 dark:border-gray-700">

      <h1 className="text-2xl font-semibold text-slate-800 dark:text-white mb-4">
        YogAI Wellness Assistant
      </h1>

      <textarea
        className="w-full border border-gray-300 dark:border-gray-600 p-3 rounded-lg bg-gray-50 dark:bg-gray-800 text-gray-800 dark:text-gray-100 focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors"
        placeholder="Ask anything about yoga or wellness..."
        value={query}
        onChange={(e) => setQuery(e.target.value)}
      />

      <div className="flex gap-3 mt-4">
        <button
          onClick={ask}
          className="flex-1 bg-indigo-600 hover:bg-indigo-700 text-white py-2 rounded-lg"
        >
          {loading ? "Thinking..." : "Ask YogAI"}
        </button>

        <VoiceInput setQuery={setQuery} />
      </div>

      {response && (
        <div className="mt-6 border-t pt-5">

          <p className="text-slate-500 text-sm mb-1">Answer</p>
          <p className="text-slate-800 dark:text-white">{response.answer}</p>

          <ConfidenceMeter score={response.confidence} />

          {response.isUnsafe && <SafetyAlert />}

          <ExplainPanel sources={response.sources} />

        </div>
      )}

    </div>
  );
}
