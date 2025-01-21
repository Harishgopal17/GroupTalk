import { useRef, useEffect } from "react";
export default function NameInput({
  user,
  setUser,
  setShowModel,
  setIsNameSubmitted,
}) {
  const nameInputRef = useRef(null);

  useEffect(() => {
    nameInputRef.current.focus();
  }, []);

  return (
    <div className="fixed top-0 left-0 w-full h-screen bg-black bg-opacity-30 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg shadow-lg p-6 w-[90%] max-w-sm flex flex-col text-center">
        <input
          ref={nameInputRef}
          type="text"
          placeholder="Enter your name"
          value={user}
          onChange={(e) => setUser(e.target.value)}
          className="flex-1 py-2 px-4 border rounded-lg outline-none mb-4"
          aria-label="Enter your name"
        />
        <button
          onClick={() => {
            setShowModel(false);
            setIsNameSubmitted(true);
          }}
          disabled={user.length < 1}
          className={`mt-6 px-4 py-2 text-white rounded-md self-center transition duration-200 
            ${
              user.length < 1
                ? "bg-gray-400 cursor-not-allowed"
                : "bg-[#588865] hover:bg-[#466c52]"
            }`}
          aria-label="Confirm name"
        >
          Ok
        </button>
      </div>
    </div>
  );
}
