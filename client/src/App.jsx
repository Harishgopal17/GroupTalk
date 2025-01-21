import { useState, useMemo } from "react";
import { Routes, Route } from "react-router-dom";
import Chatbox from "./components/Chatbox";
import Home from "./components/Home";

export default function App() {
  const BACKEND_URI = "https://grouptalk-backend.onrender.com";
  const FRONTEND_URI = "https://joingrouptalk.netlify.app/";
  const [iscopied, setIsCopied] = useState(false);
  const [showModel, setShowModel] = useState(false);
  const roomId = useMemo(() => generateId(), [showModel]);

  function generateId() {
    const segments = [];
    const chars = "abcdefghijklmnopqrstuvwxyz"; // Add numbers if needed

    for (let i = 0; i < 3; i++) {
      let segment = "";
      for (let j = 0; j < 3; j++) {
        segment += chars[Math.floor(Math.random() * chars.length)];
      }
      segments.push(segment);
    }

    return segments.join("-");
  }

  return (
    <>
      <Routes>
        <Route
          path="/"
          element={
            <Home
              FRONTEND_URI={FRONTEND_URI}
              roomId={roomId}
              iscopied={iscopied}
              setIsCopied={setIsCopied}
              showModel={showModel}
              setShowModel={setShowModel}
            />
          }
        />

        <Route
          path="/:roomId"
          element={<Chatbox BACKEND_URI={BACKEND_URI} />}
        />
      </Routes>
    </>
  );
}
