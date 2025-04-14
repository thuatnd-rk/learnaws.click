"use client";
import { useState, useEffect } from "react";

export default function ChatPage() {
  const [message, setMessage] = useState("");
  const [conversation, setConversation] = useState<{ type: string; text: string }[]>([]); // Lưu nhiều cặp Q&A
  const [loading, setLoading] = useState(false);
  const [hasAsked, setHasAsked] = useState(false);

  const handleSend = async () => {
    if (!message.trim() || loading) return;

    const userMessage = message;
    setMessage("");
    setHasAsked(true);
    setLoading(true);

    try {
      const res = await fetch("http://localhost:3001/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ message: userMessage }),
      });
      const data = await res.json();

      setConversation((prev) => [
        ...prev,
        { type: "user", text: userMessage },
        { type: "ai", text: data.reply },
      ]);
    } catch (err) {
      setConversation((prev) => [
        ...prev,
        { type: "user", text: userMessage },
        { type: "ai", text: "⚠️ Lỗi khi gửi yêu cầu tới AI." },
      ]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    setTimeout(() => {
      window.scrollTo({ top: document.body.scrollHeight, behavior: "smooth" });
    }, 100);
  }, [conversation]);

  return (
    <div className="min-h-screen bg-[var(--background)] text-[var(--foreground)] flex flex-col items-center justify-start px-4 pt-10">
      <div className="text-2xl font-semibold mb-4 text-center">Ask our AI anything</div>

      <div className="w-full max-w-2xl space-y-4">
        {/* Câu hỏi gợi ý */}
        {!hasAsked && (
          <div className="flex flex-wrap gap-2 justify-center mb-6">
            <button className="bg-gray-100 hover:bg-gray-200 dark:bg-gray-800 dark:hover:bg-gray-700 px-4 py-2 rounded-full text-sm transition">
              What can I ask you to do?
            </button>
            <button className="bg-gray-100 hover:bg-gray-200 dark:bg-gray-800 dark:hover:bg-gray-700 px-4 py-2 rounded-full text-sm transition">
              Which one of my projects is performing the best?
            </button>
            <button className="bg-gray-100 hover:bg-gray-200 dark:bg-gray-800 dark:hover:bg-gray-700 px-4 py-2 rounded-full text-sm transition">
              What projects should I be concerned about right now?
            </button>
          </div>
        )}

        {/* Hiển thị đoạn hội thoại */}
        {conversation.map((msg, idx) => (
          <div
            key={idx}
            className={`flex ${
              msg.type === "user" ? "justify-end" : "justify-start"
            }`}
          >
            <div
              className={`max-w-[75%] px-4 py-2 rounded-xl text-sm shadow ${
                msg.type === "user"
                  ? "bg-blue-500 text-white"
                  : "bg-gray-100 text-gray-800"
              }`}
            >
              {msg.text}
            </div>
          </div>
        ))}

        {/* Input field */}
        <div className="flex items-center border border-gray-300 rounded-full px-4 py-2 bg-white shadow-sm focus-within:ring-2 ring-blue-500 transition mt-4">
          <input
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && handleSend()}
            placeholder="Ask me anything about your projects"
            className="flex-grow outline-none bg-transparent text-sm"
          />
          <button
            onClick={handleSend}
            className="text-gray-500 hover:text-blue-600 transition ml-2"
            disabled={loading}
          >
            {loading ? "..." : "➤"}
          </button>
        </div>
      </div>
    </div>
  );
}
