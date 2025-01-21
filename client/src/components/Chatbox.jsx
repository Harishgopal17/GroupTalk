import { useEffect, useRef, useState } from "react";
import { useParams } from "react-router-dom";
import { io } from "socket.io-client";
import NameInput from "./NameInput";
import groupTalkLogo from "./../assets/groupTalkLogo.png";

export default function Chatbox({ BACKEND_URI }) {
  const [user, setUser] = useState("");
  const [isNameSubmitted, setIsNameSubmitted] = useState(false);
  const [messages, setMessages] = useState([]);
  const [message, setMessage] = useState("");
  const [showModel, setShowModel] = useState(true);
  const [socket, setSocket] = useState(null);

  const chatEndRef = useRef(null);
  const inputRef = useRef("");
  const { roomId } = useParams();

  // useEffect(() => {
  //   inputRef.current.focus();
  // }, [isNameSubmitted]);

  useEffect(() => {
    if (isNameSubmitted) {
      const newSocket = io(BACKEND_URI);
      setSocket(newSocket);

      newSocket.emit("join room", { username: user, roomId });

      // Listen for user joined event
      newSocket.on("user joined", (username) => {
        const joinMessage = {
          id: Date.now(),
          text: `${username} has joined the chat`,
          from: "system",
          timestamp: new Date().toLocaleTimeString(),
        };
        setMessages((prev) => [...prev, joinMessage]);
      });

      // Listen for chat messages
      newSocket.on("chat message", (msg) => {
        setMessages((prev) => [...prev, msg]);
      });

      // Listen for user left event
      newSocket.on("user left", (username) => {
        const leftMessage = {
          id: Date.now(),
          text: `${username} has left the chat`,
          from: "system",
          timestamp: new Date().toLocaleTimeString(),
        };
        setMessages((prev) => [...prev, leftMessage]);
      });

      // Clean up the socket connection on component unmount
      return () => newSocket.disconnect();
    }
  }, [isNameSubmitted, user, roomId]);

  ///////////////////////////////////////////////////

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
        socket.emit("chat message", { roomId, msg: newMessage });
      }
      setMessage(""); // Clear input field
    }
  }

  return (
    <>
      {showModel ? (
        <NameInput
          user={user}
          setUser={setUser}
          setShowModel={setShowModel}
          setIsNameSubmitted={setIsNameSubmitted}
        />
      ) : (
        <div className="bg-[#212529]">
          <div className="max-w-[1000px] mx-auto h-screen flex flex-col">
            <header className="flex justify-between items-center bg-[#8c9397] px-10 max-sm:px-2">
              <div className="w-20 h-20 flex justify-center items-center max-sm:w-16">
                <img src={groupTalkLogo} alt="Group Talk Logo" />
              </div>
              <div className="flex justify-center items-center">
                <h3 className="text-xl text-black font-medium bg-[#dee2e6] px-2 py-1 rounded-md max-sm:text-base">{`Room ID: ${roomId}`}</h3>
              </div>
            </header>
            <div className="flex-1 overflow-y-auto bg-gray-100 p-5">
              {messages.map((message) => (
                <div
                  key={message.id}
                  className={`flex flex-col mb-[2px]  ${
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
                    {message.from !== "system" && (
                      <span className="self-start pb-1 font-medium">{`${
                        message.from !== user ? message.from : ""
                      }`}</span>
                    )}
                    <div className="text-base leading-5">{message.text}</div>
                    {message.from !== "system" && (
                      <span className=" self-end text-[11px] leading-4 pl-0 text-[#373b3e]">
                        {message.timestamp}
                      </span>
                    )}
                  </div>
                </div>
              ))}
              <div ref={chatEndRef} />
            </div>
            <div className="bg-gray-100 py-1 flex items-center justify-center">
              <form
                onSubmit={(e) => sendMessage(e)}
                className="w-full flex items-center px-3"
              >
                <input
                  ref={inputRef}
                  type="text"
                  placeholder="Type your message..."
                  className="flex-1 py-2 px-4 border rounded-lg outline-none"
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                />
                <button
                  onClick={(e) => sendMessage(e)}
                  className="ml-3 px-4 py-3 bg-[#6d6262] text-white text-lg rounded-xl font-normal max-sm:text-base hover:bg-[#7e7575] transition-all duration-300 font-roboto"
                >
                  Send
                </button>
              </form>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
