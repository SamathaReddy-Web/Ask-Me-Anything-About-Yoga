export async function askAI(query, profile, sessionId) {
  try {
    const res = await fetch("http://localhost:5000/ask", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ query, profile, sessionId })
    });

    if (!res.ok) {
      throw new Error("Backend error");
    }

    return await res.json();
  } catch (err) {
    console.error("API Error:", err);
    return {
      answer: "Backend is not reachable. Please make sure backend is running.",
      confidence: 0,
      sources: [],
      isUnsafe: false
    };
  }
}
