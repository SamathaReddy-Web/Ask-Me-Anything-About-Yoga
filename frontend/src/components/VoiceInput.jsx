export default function VoiceInput({ setQuery }) {
  const startVoice = () => {
    if (!('webkitSpeechRecognition' in window)) {
      alert('Voice input is not supported in this browser. Please use Chrome or Edge.');
      return;
    }
    const recognition = new window.webkitSpeechRecognition();
    recognition.lang = "en-IN";
    recognition.onresult = (e) => setQuery(e.results[0][0].transcript);
    recognition.onerror = (e) => console.error('Speech recognition error:', e.error);
    recognition.start();
  };

  return (
    <button
      onClick={startVoice}
      className="flex-1 bg-emerald-600 hover:bg-emerald-700 text-white py-2 rounded-lg"
    >
      🎙 Voice
    </button>
  );
}
