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

    newSocket.emit("user joined", uname);

    // Clean up the socket connection on component unmount
    return () => newSocket.disconnect();
  }, []);

  useEffect(() => {
    if (!socket) return;

    const handleChatMessage = (message) => {
      setMessages((prevMessages) => [...prevMessages, message]);
    };

    const handleUserJoined = (username) => {
      const joinMessage = {
        id: Date.now(),
        text: `${username} has joined the chat`,
        from: "system",
        timestamp: new Date().toLocaleTimeString(),
      };
      setMessages((prevMessages) => [...prevMessages, joinMessage]);
    };

    const handleUserLeft = (username) => {
      const leftMessage = {
        id: Date.now(),
        text: `${username} left the chat`,
        from: "system",
        timestamp: new Date().toLocaleTimeString(),
      };
      setMessages((prevMessages) => [...prevMessages, leftMessage]);
    };

    // Add a listener if not already set
    if (!socket.hasListeners("chat message")) {
      socket.on("chat message", handleChatMessage);
    }

    socket.on("user joined", handleUserJoined);
    socket.on("user left", handleUserLeft);

    socket.on();

    return () => {
      socket.off("chat message", handleChatMessage);
      socket.off("user joined", handleUserJoined);
      socket.off("user left", handleUserLeft);
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
        timestamp: new Date().toLocaleTimeString([], {
          hour: "2-digit",
          minute: "2-digit",
          hour12: true,
        }),
      };
      if (socket?.connected) {
        socket.emit("chat message", newMessage);
      }
      setMessage("");
    }
  }

  return (
    <div className="max-w-[1000px] mx-auto h-screen bg-white flex flex-col">
      <header className="flex justify-between items-center bg-green px-10 py-6">
        <div className="flex">
          <span>🗨️</span>
          <h1>GroupTalk</h1>
        </div>
        <div>
          <h3>Room Name</h3>
        </div>
      </header>
      <div className="flex-1 overflow-y-auto bg-gray-100 p-5">
        {messages.map((message) => (
          <div
            key={message.id}
            className={`flex flex-col mb-1  ${
              message.from === "system"
                ? "items-center"
                : message.from === user
                ? "items-end"
                : "items-start"
            }`}
          >
            <div
              className={`flex flex-col max-w-md ${
                message.from === "system"
                  ? "system"
                  : message.from === user
                  ? "sent-message"
                  : "received-message"
              }`}
            >
              <span className="self-start pb-1 font-medium">{`${
                message.from === "system"
                  ? ""
                  : message.from !== user
                  ? message.from
                  : ""
              }`}</span>
              <div className="text-base leading-5">{message.text}</div>
              <span className=" self-end text-[11px] leading-4 pl-0 text-[#373b3e]">
                {`${message.from === "system" ? "" : message.timestamp}`}
              </span>
            </div>
          </div>
        ))}
        <div ref={chatEndRef} /> {/* For auto-scroll */}
      </div>
      <div className="bg-white p-4">
        <form
          onSubmit={(e) => sendMessage(e)}
          className="w-full flex items-center"
        >
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
      </div>
    </div>
  );
}

//  const [messages, setMessages] = useState([
//    {
//      id: "1737357218084",
//      text: "Harish has joined the chat",
//      from: "system",
//      timestamp: "12:40 PM",
//    },
//    {
//      id: "1737357218085",
//      text: "Vicky has joined the chat",
//      from: "system",
//      timestamp: "12:41 PM",
//    },
//    {
//      id: "1737357218086",
//      text: "Hii hweuvhawdo jgaiyvhsd kjabdvn loram dsnvhasbv AHDVUIJASHDVO JHDSVKDSJBVKnsjdvn ksjvnisknv nsldjvsnkdjfv sjdvnksjvn ksjbvksf",
//      from: "vickyroomate",
//      timestamp: "12:41 PM",
//    },
//    {
//      id: "1737357218089",
//      text: "Hii da",
//      from: "Harish",
//      timestamp: "12:42 PM",
//    },
//    {
//      id: "1737357218088",
//      text: "Byee",
//      from: "vicky",
//      timestamp: "12:43 PM",
//    },
//    {
//      id: "1737357218098",
//      text: "Byee da",
//      from: "Harish",
//      timestamp: "12:43 PM",
//    },
//  ]);
