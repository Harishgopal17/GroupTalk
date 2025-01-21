import { useState, useEffect } from "react";
import groupTalkLogo from "./../assets/groupTalkLogo.png";
import groupDiscussion from "./../assets/groupDiscussion.svg";

export default function Home() {
  const [time, setTime] = useState(new Date());

  useEffect(() => {
    const interval = setInterval(() => {
      setTime(new Date());
    }, 1000);
    return () => clearInterval(interval);
  }, []);

  return (
    <>
      <div className="max-w-[1300px] mx-auto h-screen flex flex-col relative">
        <nav className="px-3 w-full flex items-center justify-between z-10 absolute top-0 left-0">
          <div className="w-24 h-24 flex justify-center items-center">
            <a href="/">
              <img src={groupTalkLogo} alt="logo" />
            </a>
          </div>
          <div className="flex text-lg gap-1 text-[#868e96]">
            <span>
              {time.toLocaleTimeString([], {
                hour: "2-digit",
                minute: "2-digit",
              })}
            </span>
            <span>•</span>
            <span>
              {time.toLocaleDateString("en-GB", {
                weekday: "short",
              })}
            </span>
            <span>
              {time.toLocaleDateString("en-GB", {
                day: "2-digit",
                month: "short",
              })}
            </span>
          </div>
        </nav>
        <section className="grid grid-cols-2 justify-center items-center h-full">
          <div className="flex flex-col gap-4">
            <h1 className="text-4xl font-medium font-roboto">
              The easiest way to join and enjoy group conversations
            </h1>
            <h3 className="text-[#495057] text-xl tracking-wide pb-5">
              Join the chat, share the vibe, with GroupTalk
            </h3>
            <div className="flex gap-7">
              <button className="px-6 py-3 bg-[#7e7575] text-white text-lg rounded-3xl font-normal hover:bg-[#6d6262] transition-all duration-300">
                Create new room
              </button>
              <button className="px-6 py-3 border-2 border-[#7e7575] rounded-3xl text-lg font-medium hover:border-[#bdb9b9] transition-all duration-300">
                Join room
              </button>
            </div>
          </div>
          <div className="flex flex-col justify-center items-center">
            <img
              src={groupDiscussion}
              alt="group discussion svg"
              className="w-full"
            />
            <h4 className="text-center max-w-[80%]">
              Click <strong>Create new room</strong> to create new chatting room
              and share room id to people that you want to chat with
            </h4>
          </div>
        </section>
      </div>
    </>
  );
}
