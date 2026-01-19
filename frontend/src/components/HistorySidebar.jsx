export default function HistorySidebar({ history }) {
  return (
    <div className="w-72 bg-gray-900 text-gray-100 p-5 hidden md:block">
      <h2 className="font-semibold mb-4 text-lg">Session History</h2>

      <div className="space-y-3 text-sm">
        {history.map((h, i) => (
          <div key={i} className="bg-gray-800 rounded-lg p-3 border border-gray-700">
            {h.query}
          </div>
        ))}
      </div>
    </div>
  );
}
