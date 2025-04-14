"use client";
import { useState } from "react";
import { sendMessage } from "@/lib/api";

export default function ChatBox() {
  const [message, setMessage] = useState("");
  const [reply, setReply] = useState("");

  const handleSend = async () => {
    const res = await sendMessage(message);
    setReply(res);
  };

  return (
    <div>
      <input value={message} onChange={(e) => setMessage(e.target.value)} className="border p-2 rounded w-full" />
      <button onClick={handleSend} className="mt-2 px-4 py-2 bg-blue-600 text-white rounded">Send</button>
      <div className="mt-4">{reply}</div>
    </div>
  );
}
