import React from "react";

export default function Header() {
  return (
    <header className="flex justify-between px-10 py-6">
      <div className="flex">
        <span>🗨️</span>
        <h1>GroupTalk</h1>
      </div>
      <div>
        <h3>Room Name</h3>
      </div>
    </header>
  );
}
