import { useState } from "react";
import { FaRegCopy } from "react-icons/fa6";
import { IoMdClose } from "react-icons/io";
import { FaCheck } from "react-icons/fa6";

export default function NewRoom() {
  const [roomId, setRoomId] = useState(generateId());
  const [iscopied, setIsCopied] = useState(false);
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

  function handleCopy() {
    const textToCopy = `http://localhost:5173/${roomId}`;
    navigator.clipboard
      .writeText(textToCopy)
      .then(() => {
        setIsCopied(true);
      })
      .catch((err) => {
        console.error("Failed to copy text: ", err);
      });
  }

  return (
    <div className="fixed top-0 left-0 w-full h-screen bg-black bg-opacity-30 flex items-center justify-center z-50">
      <div className="bg-[#e9ecef] rounded-xl shadow-lg p-5 w-[90%] max-w-sm text-center flex flex-col">
        <div className="flex flex-col gap-4 justify-center">
          <div className="flex justify-center gap-5">
            <h6 className="text-2xl font-medium text-start">
              Here's your joining information
            </h6>
            <span className="cursor-pointer rounded-full self-center p-1 hover:bg-[#dde3ea] transition-colors duration-300">
              <IoMdClose size={32} />
            </span>
          </div>
          <div>
            <p className="text-start text-[#495057] font-sans ">
              Send this to people that you want to chat with. Make sure that you
              save it so that you can use is later, too.
            </p>
          </div>
          <div className="flex items-center justify-between bg-[#dde3ea] px-6 py-1 w-full rounded-lg leading-5">
            <p>{`http://localhost:5173/${roomId}`}</p>
            {iscopied ? (
              <span className="cursor-pointer rounded-full self-center p-2 hover:bg-[#cbcfd3] transition-colors duration-300">
                <FaCheck size={24} />
              </span>
            ) : (
              <span
                onClick={handleCopy}
                className="cursor-pointer rounded-full self-center p-2 hover:bg-[#cbcfd3] transition-colors duration-300"
              >
                <FaRegCopy size={24} />
              </span>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
