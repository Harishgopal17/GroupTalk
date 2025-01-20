import { useEffect, useRef, useState } from "react";
import { io } from "socket.io-client";

export default function Chatbox() {
  const [user, setUser] = useState("");
  const [messages, setMessages] = useState([]);
  const [message, setMessage] = useState("");
  const [socket, setSocket] = useState(null);
  const chatEndRef = useRef(null);

  useEffect(() => {
    const uname = prompt("Enter your name");
    setUser(uname);
    const newSocket = io("http://localhost:3000");
    setSocket(newSocket);

    // Clean up the socket connection on component unmount
    return () => newSocket.disconnect();
  }, []);

  useEffect(() => {
    if (!socket) return;

    const handleChatMessage = (message) => {
      setMessages((prevMessages) => [...prevMessages, message]);
    };

    socket.on("chat message", handleChatMessage);

    return () => {
      socket.off("chat message", handleChatMessage); // Clean up the listener
    };
  }, [socket]);

  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  // Send a message
  function sendMessage(e) {
    e.preventDefault();
    if (message.trim()) {
      const newMessage = {
        id: Date.now(),
        text: message,
        from: user,
        timestamp: new Date().toLocaleTimeString(),
      };
      setMessages((prevMessages) => [...prevMessages, newMessage]);

      // Emit the message to the server
      if (socket?.connected) {
        socket.emit("chat message", newMessage);
      }
      setMessage("");
    }
  }

  function toggleBtn(e) {
    e.preventDefault();
    if (socket.connected) {
      socket.disconnect();
    } else {
      socket.connect();
    }
  }

  return (
    <div className="max-w-[1200px] mx-auto h-screen bg-white flex flex-col">
      <header className="flex justify-between items-center bg-green px-10 py-6">
        <div className="flex">
          <span>🗨️</span>
          <h1>GroupTalk</h1>
        </div>
        <div>
          <h3>Room Name</h3>
        </div>
      </header>
      <div className="flex-1 overflow-y-auto bg-gray-100 p-4">
        {messages.map((message) => (
          <div
            key={message.id}
            className={`flex flex-col mb-4 ${
              message.from === user ? "items-end" : "items-start"
            }`}
          >
            <span>{message.from}</span>
            <div
              className={`rounded-lg px-4 py-2 max-w-md ${
                message.from === user
                  ? "bg-blue-500 text-white"
                  : "bg-gray-300 text-gray-800"
              }`}
            >
              {message.text}
            </div>
            <span className="text-xs text-gray-500 mt-1">
              {message.timestamp}
            </span>
          </div>
        ))}
        <div ref={chatEndRef} /> {/* For auto-scroll */}
      </div>
      <div className="bg-white p-4 flex">
        <form onSubmit={(e) => sendMessage(e)} className="flex items-center">
          <input
            type="text"
            placeholder="Type your message..."
            className="flex-1 py-2 px-4 border rounded-lg outline-none"
            value={message}
            onChange={(e) => setMessage(e.target.value)}
          />
          <button className="ml-4 px-4 py-2 bg-green rounded-lg hover:bg-green">
            Send
          </button>
        </form>
        <button
          className="px-4 py-2 bg-green rounded-lg hover:bg-green"
          onClick={(e) => toggleBtn(e)}
        >
          {socket?.connected ? "Disconnect" : "Connect"}
        </button>
      </div>
    </div>
  );
}
