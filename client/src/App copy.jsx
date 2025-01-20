import React, { useState, useEffect } from "react";
import io from "socket.io-client";

const socket = io("http://localhost:3000");

export default function App() {
  const [messages, setMessages] = useState([]);
  const [text, setText] = useState("");
  const [username, setUsername] = useState("");

  useEffect(() => {
    // Fetch initial messages
    fetch("http://localhost:3000/messages")
      .then((res) => res.json())
      .then((data) => setMessages(data))
      .catch((err) => console.error("Error fetching messages:", err));

    // Listen for new messages
    socket.on("chat message", (message) => {
      setMessages((prevMessages) => [...prevMessages, message]);
    });

    return () => socket.off("chat message");
  }, []);

  const sendMessage = (e) => {
    e.preventDefault();

    if (text.trim() && username.trim()) {
      const messageData = { username, text };
      socket.emit("chat message", messageData);
      setText("");
    }
  };

  return (
    <div className="bg-gray-100 min-h-screen flex flex-col items-center py-6">
      <h1 className="text-2xl font-bold mb-4">Chat Room</h1>

      <div className="bg-white shadow-md rounded-lg p-4 w-full max-w-md">
        <div className="h-64 overflow-y-auto mb-4">
          {messages.map((message, index) => (
            <div key={index} className="mb-2">
              <span className="font-semibold">{message.username}: </span>
              <span>{message.text}</span>
            </div>
          ))}
        </div>

        <form onSubmit={sendMessage} className="flex flex-col gap-2">
          <input
            type="text"
            placeholder="Enter your name"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            className="p-2 border border-gray-300 rounded-md"
          />

          <input
            type="text"
            placeholder="Enter your message"
            value={text}
            onChange={(e) => setText(e.target.value)}
            className="p-2 border border-gray-300 rounded-md"
          />

          <button
            type="submit"
            className="bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600"
          >
            Send
          </button>
        </form>
      </div>
    </div>
  );
}
