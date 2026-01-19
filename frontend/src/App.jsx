import { useState } from "react";
import ChatBox from "./components/ChatBox";
import HistorySidebar from "./components/HistorySidebar";

export default function App() {
  const [history, setHistory] = useState([]);

  return (
    <div className="dark">
      <div className="flex min-h-screen bg-white dark:bg-gray-900 transition-colors">

        <HistorySidebar history={history} />

        <div className="flex-1 p-10">
          <ChatBox history={history} setHistory={setHistory} />
        </div>

      </div>
    </div>
  );
}
