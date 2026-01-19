export default function ConfidenceMeter({ score }) {
  const percent = Math.round(score * 100);

  return (
    <div className="mt-4 flex items-center gap-3">
      <div className="h-2 w-full bg-gray-200 dark:bg-gray-700 rounded-full overflow-hidden">
        <div
          className="h-full bg-blue-500 transition-all duration-300"
          style={{ width: `${percent}%` }}
        />
      </div>
      <span className="text-sm font-semibold text-gray-700 dark:text-gray-200">
        {percent}%
      </span>
    </div>
  );
}
