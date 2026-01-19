import { useState } from "react";

export default function ExplainPanel({ sources }) {
  const [open, setOpen] = useState(false);

  return (
    <div className="mt-5">
      <button
        onClick={() => setOpen(!open)}
        className="text-blue-600 hover:text-blue-700 font-medium transition-colors"
      >
        {open ? "Hide explanation" : "How did I get this answer?"}
      </button>

      {open && (
        <div className="mt-3 bg-slate-50 dark:bg-zinc-800 border border-slate-200 dark:border-zinc-700 p-4 rounded-lg">
          <p className="font-semibold text-slate-700 dark:text-slate-200 mb-2">
            Sources Used
          </p>
          <ul className="list-disc ml-5 text-sm text-slate-600 dark:text-slate-300">
            {sources.map((s, i) => (
              <li key={i}>{s}</li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}
