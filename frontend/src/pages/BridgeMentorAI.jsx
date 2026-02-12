import { useState, useEffect, useRef } from "react";
import { useLocation } from "react-router-dom";

export default function BridgeMentorAI() {
  const location = useLocation();
  const analysis = location.state?.analysis;

  const [messages, setMessages] = useState([
    {
      role: "assistant",
      content:
        "👋 Hello! I'm Bridge Mentor AI.\n\nI can:\n• Explain your readiness score\n• Identify skill gaps\n• Suggest 30-60-90 day roadmap\n• Improve resume bullets\n• Simulate interviews\n\nAsk me anything about your analyzed report.",
    },
  ]);

  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);

  const chatEndRef = useRef(null);

  // ✅ Auto Scroll to bottom
  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, loading]);

  const handleSend = async () => {
    if (!input.trim()) return;

    if (!analysis) {
      setMessages((prev) => [
        ...prev,
        {
          role: "assistant",
          content:
            "⚠️ I don’t see any analyzed report.\n\nPlease upload and analyze your project first.\n\nOnce analysis is complete, I can provide personalized career guidance based on your verified skills, readiness score, industry gaps, and recommended roles.",
        },
      ]);
      return;
    }

    const userMessage = { role: "user", content: input };
    setMessages((prev) => [...prev, userMessage]);
    setInput("");
    setLoading(true);

    try {
      const response = await fetch("http://127.0.0.1:8000/mentor", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          question: input,
          analysis: analysis,
        }),
      });

      if (!response.ok) {
        throw new Error("Backend error");
      }

      const data = await response.json();

      setMessages((prev) => [
        ...prev,
        {
          role: "assistant",
          content:
            data.answer ||
            "I couldn't generate a proper response. Try asking in a more specific way.",
        },
      ]);
    } catch (error) {
      setMessages((prev) => [
        ...prev,
        {
          role: "assistant",
          content:
            "❌ Unable to connect to AI backend.\n\nMake sure FastAPI server is running on port 8000.",
        },
      ]);
    }

    setLoading(false);
  };

  return (
    <div className="min-h-screen bg-[#0B1026] text-white p-10 flex flex-col">
      <h1 className="text-3xl font-bold mb-6">
        🧠 Bridge Mentor AI
      </h1>

      {/* Chat Window */}
      <div className="flex-1 bg-[#11172F] p-6 rounded-xl overflow-y-auto mb-4 border border-white/10">
        {messages.map((msg, i) => (
          <div
            key={i}
            className={`mb-4 ${
              msg.role === "user"
                ? "text-cyan-400 text-right"
                : "text-purple-400 text-left"
            }`}
          >
            <strong>
              {msg.role === "user" ? "You: " : "Mentor: "}
            </strong>
            <div className="whitespace-pre-line mt-1">
              {msg.content}
            </div>
          </div>
        ))}

        {loading && (
          <div className="text-slate-400 animate-pulse">
            Mentor is thinking...
          </div>
        )}

        <div ref={chatEndRef} />
      </div>

      {/* Input Section */}
      <div className="flex space-x-3">
        <input
          className="flex-1 p-3 rounded-lg bg-[#1E293B] text-white border border-white/10 focus:outline-none focus:border-cyan-400 transition"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Ask about your skill gaps, roadmap, interview..."
          onKeyDown={(e) => {
            if (e.key === "Enter") {
              handleSend();
            }
          }}
        />
        <button
          onClick={handleSend}
          disabled={loading}
          className="bg-cyan-500 hover:bg-cyan-600 px-5 rounded-lg font-semibold transition disabled:opacity-50"
        >
          Send
        </button>
      </div>
    </div>
  );
}
