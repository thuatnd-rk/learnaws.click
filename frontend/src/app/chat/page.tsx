"use client";

import { useState, useEffect, useRef } from "react";
import { sendMessage } from "./api";
import { Loader2 } from "lucide-react";
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import rehypeRaw from 'rehype-raw';

type Message = {
  type: "user" | "ai";
  text: string;
};

export default function ChatPage() {
  const [message, setMessage] = useState("");
  const [conversation, setConversation] = useState<Message[]>([]);
  const [loading, setLoading] = useState(false);
  const [hasAsked, setHasAsked] = useState(false);
  const [error, setError] = useState<string | null>(null);
  
  const messagesEndRef = useRef<HTMLDivElement>(null);

  // Hàm xử lý gửi tin nhắn đến API
  const handleSend = async () => {
    if (!message.trim() || loading) return;

    const userMessage = message;
    setMessage("");
    setHasAsked(true);
    setLoading(true);
    setError(null);

    // Add user message to conversation immediately
    setConversation(prev => [...prev, { type: "user", text: userMessage }]);

    try {
      console.log("Sending message to API:", userMessage);
      const data = await sendMessage(userMessage);

      console.log(data)
      
      // Add AI response to conversation
      setConversation(prev => [...prev, { type: "ai", text: data.reply }]);
    } catch (err) {
      console.error("Chat request failed:", err);
      setError(err instanceof Error ? err.message : "Unknown error occurred");
      
      setConversation(prev => [
        ...prev,
        { type: "ai", text: "⚠️ Lỗi khi gửi yêu cầu tới AI. Vui lòng thử lại sau." }
      ]);
    } finally {
      setLoading(false);
    }
  };

  // Hàm xử lý khi click vào suggestion buttons
  const handleSuggestionClick = (suggestion: string) => {
    setMessage(suggestion);
    setTimeout(() => handleSend(), 100);
  };

  // Cuộn xuống dưới khi có tin nhắn mới
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [conversation]);

  return (
    <div className="h-[calc(100vh-64px)] bg-[var(--background)] text-[var(--foreground)] flex flex-col items-center p-4 md:p-6 overflow-hidden">
      <h1 className="text-2xl font-semibold mb-6 text-center">DevOps AI Assistant</h1>

      {/* Container chính */}
      <div className="w-full flex flex-col flex-grow overflow-hidden px-4 md:px-8 lg:px-16">
        {/* Error display */}
        {error && (
          <div className="bg-red-50 border border-red-200 text-red-800 rounded-md p-3 mb-4 text-sm">
            <strong>Error:</strong> {error}
          </div>
        )}

        {/* Suggestions */}
        {!hasAsked && (
          <div className="flex flex-wrap gap-2 justify-center mb-6">
            <button 
              onClick={() => handleSuggestionClick("Tell me about DevOps best practices")}
              className="bg-gray-100 hover:bg-gray-200 dark:bg-gray-800 dark:hover:bg-gray-700 px-4 py-2 rounded-full text-sm transition"
            >
              DevOps best practices?
            </button>
            <button 
              onClick={() => handleSuggestionClick("How to optimize CI/CD pipeline?")}
              className="bg-gray-100 hover:bg-gray-200 dark:bg-gray-800 dark:hover:bg-gray-700 px-4 py-2 rounded-full text-sm transition"
            >
              Optimize CI/CD pipeline
            </button>
            <button 
              onClick={() => handleSuggestionClick("Kubernetes vs Docker Swarm")}
              className="bg-gray-100 hover:bg-gray-200 dark:bg-gray-800 dark:hover:bg-gray-700 px-4 py-2 rounded-full text-sm transition"
            >
              Kubernetes vs Docker Swarm
            </button>
          </div>
        )}

        {/* Conversation list */}
        <div className="flex-grow overflow-y-auto mb-4 space-y-4">
        {conversation.map((msg, idx) => (
          <div
            key={idx}
            className={`flex ${
              msg.type === "user" ? "justify-end" : "justify-start"
            } mb-4`}
          >
            <div
              className={`max-w-[75%] px-4 py-3 rounded-2xl shadow-md ${
                msg.type === "user"
                  ? "bg-blue-600 text-white"
                  : "bg-gray-100 dark:bg-gray-800 text-black dark:text-gray-100"
              }`}
            >
              {msg.type === "user" ? (
                <div className="text-sm">{msg.text}</div>
              ) : (
                <div className="markdown-body">
                  <ReactMarkdown 
                    remarkPlugins={[remarkGfm]} 
                    rehypePlugins={[rehypeRaw]}
                    components={{
                      // Apply the className to the wrapper element instead
                      p: ({node, ...props}) => <p className="text-sm prose dark:prose-invert max-w-none" {...props} />
                    }}
                  >
                    {msg.text}
                  </ReactMarkdown>
                </div>
              )}
            </div>
          </div>
        ))}
          
          {/* Auto-scroll anchor */}
          <div ref={messagesEndRef} />
          
          {/* Loading indicator */}
          {loading && (
            <div className="flex justify-start">
              <div className="bg-gray-100 dark:bg-gray-800 rounded-xl px-4 py-3">
                <Loader2 className="h-5 w-5 animate-spin text-gray-500" />
              </div>
            </div>
          )}
        </div>

        {/* Message input - Fixed positioning with reduced width & auto-expanding */}
        <div className="bg-[var(--background)] pt-2 pb-4 flex justify-center">
          <div className="w-1/2 relative">
            <div className="flex items-center border border-gray-300 rounded-full px-4 py-2 bg-white dark:bg-gray-900 shadow-sm focus-within:ring-2 ring-blue-500 transition">
              <textarea
                value={message}
                onChange={(e) => {
                  setMessage(e.target.value);
                  // Auto-adjust height based on content
                  e.target.style.height = "24px"; // Reset height
                  const newHeight = Math.min(e.target.scrollHeight, 24 * 4); // Limit to 4x original height
                  e.target.style.height = `${newHeight}px`;
                }}
                onKeyDown={(e) => {
                  if (e.key === "Enter" && !e.shiftKey) {
                    e.preventDefault(); // Prevent newline
                    handleSend();
                  }
                }}
                placeholder="Ask me about DevOps, AWS, or cloud technologies..."
                className="flex-grow outline-none bg-transparent text-sm min-h-[24px] max-h-[96px] overflow-y-auto resize-none"
                disabled={loading}
                rows={1}
              />
              <button
                onClick={handleSend}
                className="ml-2 flex items-center justify-center"
                disabled={loading}
              >
                {loading ? (
                  <Loader2 className="h-5 w-5 animate-spin text-gray-400" />
                ) : (
                  <span className="text-blue-500 hover:text-blue-700">➤</span>
                )}
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}