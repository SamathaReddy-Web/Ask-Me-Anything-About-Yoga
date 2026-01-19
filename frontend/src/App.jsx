import { useState } from "react";
import ChatBox from "./components/ChatBox";
import HistorySidebar from "./components/HistorySidebar";
import ThemeSwitcher from "./components/ThemeSwitcher";

export default function App() {
  const [dark, setDark] = useState(false);
  const [history, setHistory] = useState([]);

  return (
    <div className={dark ? "dark" : ""}>
      <div className="flex min-h-screen bg-white dark:bg-gray-900 transition-colors">

        <HistorySidebar history={history} />

        <div className="flex-1 p-10">
          <ThemeSwitcher setDark={setDark} />
          <ChatBox history={history} setHistory={setHistory} />
        </div>

      </div>
    </div>
  );
}
