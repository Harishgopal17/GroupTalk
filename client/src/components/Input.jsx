import React from "react";

export default function Input({ sendMessage }) {
  return (
    <div className="bg-white p-4 flex items-center">
      <input
        type="text"
        placeholder="Type your message..."
        className="flex-1 py-2 px-4 border rounded-lg outline-none"
      />
      <button
        className="ml-4 px-4 py-2 bg-green rounded-lg hover:bg-green"
        onClick={sendMessage}
      >
        Send
      </button>
    </div>
  );
}
