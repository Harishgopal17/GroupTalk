import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import NewRoom from "./NewRoom";
import groupTalkLogo from "./../assets/groupTalkLogo.png";
import groupDiscussion from "./../assets/groupDiscussion.svg";

export default function Home({
  FRONTEND_URI,
  roomId,
  showModel,
  setShowModel,
  iscopied,
  setIsCopied,
}) {
  const [time, setTime] = useState(new Date());
  const [joiningId, setJoiningId] = useState("");

  useEffect(() => {
    const interval = setInterval(() => {
      setTime(new Date());
    }, 1000);
    return () => clearInterval(interval);
  }, []);

  const navigate = useNavigate();

  return (
    <>
      <div className="max-w-[1300px] mx-auto flex flex-col relative max-lg:px-5 max-md:mb-10">
        <nav className="px-3 w-full flex items-center justify-between z-10 absolute top-0 left-0 ">
          <div className="w-24 h-24 flex justify-center items-center max-sm:w-16">
            <a href="/">
              <img src={groupTalkLogo} alt="Group Talk Logo" />
            </a>
          </div>
          <div className="flex text-lg gap-1 text-[#868e96] font-normal font-sans max-sm:text-base">
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
        <section className="pt-14 grid grid-cols-2 justify-center items-center h-full max-lg:grid-rows-2 max-sm:pt-28 max-lg:pt-5">
          <div className="flex flex-col gap-4 max-lg:col-span-2">
            <h1 className="text-4xl font-medium font-roboto max-sm:text-2xl">
              The easiest way to join and enjoy group conversations
            </h1>
            <h3 className="text-[#495057] text-xl tracking-wide pb-5 max-sm:text-lg">
              Join the chat, share the vibe, with GroupTalk
            </h3>
            <div className="flex gap-7 max-sm:flex-col max-sm:gap-4">
              <button
                className="px-6 py-3 bg-[#6d6262] text-white text-lg rounded-3xl font-normal max-sm:text-base max-sm:self-start max-sm:px-4 max-sm:py-2 hover:bg-[#7e7575] transition-all duration-300 font-roboto"
                onClick={() => setShowModel(true)}
              >
                Create new room
              </button>
              <div className="flex gap-4">
                <input
                  type="text"
                  placeholder="Enter room id"
                  value={joiningId}
                  onChange={(e) => setJoiningId(e.target.value)}
                  className="px-4 py-3 border-2 border-[#7e7575] rounded-3xl text-lg font-normal outline-none max-sm:text-sm max-sm:px-3 max-sm:py-2 focus:border-[#bdb9b9] transition-all duration-300"
                />

                <button
                  onClick={() => navigate(`/${joiningId}`)}
                  className={`text-lg font-medium text-[#a5a2a2] max-sm:text-base ${
                    joiningId.length > 0 && "text-[#494646]"
                  }`}
                >
                  Join
                </button>
              </div>
            </div>
          </div>
          <div className="flex flex-col justify-center items-center max-lg:col-span-2 max-sm:gap-3">
            <img
              src={groupDiscussion}
              alt="group discussion svg"
              className="w-full"
            />
            <h4 className="text-center max-w-[80%] font-sans max-sm:max-w-full">
              Click <strong>Create new room</strong> to create new chatting room
              and share room id to people that you want to chat with
            </h4>
          </div>
        </section>
      </div>
      {showModel && (
        <NewRoom
          FRONTEND_URI={FRONTEND_URI}
          roomId={roomId}
          iscopied={iscopied}
          setIsCopied={setIsCopied}
          setShowModel={setShowModel}
        />
      )}
    </>
  );
}
