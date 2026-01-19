export default function ThemeSwitcher({ setTheme }) {
  return (
    <div className="mb-6 flex justify-end gap-3">
      <button
        onClick={() => setTheme("light")}
        className="px-4 py-2 rounded-lg bg-gray-100 hover:bg-gray-200 text-gray-800 border border-gray-300 transition-colors"
      >
        Light
      </button>

      <button
        onClick={() => setTheme("dark")}
        className="px-4 py-2 rounded-lg bg-gray-800 hover:bg-gray-700 text-white border border-gray-600 transition-colors"
      >
        Dark
      </button>
    </div>
  );
}
