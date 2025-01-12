import React from "react";
import Header from "./Header";

export default function Chatbox() {
  return (
    <div className="max-w-[1200px] mx-auto h-screen bg-white">
      <Header />
      <section>
        <div>Chat...</div>
        <div>
          <div>
            <label htmlFor="message"></label>
            <input type="text" />
          </div>
          <div>
            <button>send</button>
          </div>
        </div>
      </section>
    </div>
  );
}
