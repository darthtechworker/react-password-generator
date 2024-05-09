import { useState, useCallback, useEffect, useRef } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function App() {
  const [password, setPassword] = useState("");
  const [isNumAllowed, setIsNumAllowed] = useState(false);
  const [isSpCharAllowed, setIsSpCharAllowed] = useState(false);
  const [passwordLen, setPasswordLen] = useState(20);

  const passwordRef = useRef(null);

  const generatePassword = useCallback(() => {
    let password = "";
    let str = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz";

    if (isNumAllowed) str += "0123456789";
    if (isSpCharAllowed) str += "!@#$%^&*()_+";

    for (let i = 0; i < passwordLen; i++) {
      const char = Math.floor(Math.random() * str.length);
      password += str.charAt(char);
    }

    setPassword(password);
  }, [passwordLen, isNumAllowed, isSpCharAllowed]);

  const copyPasswordToClipboard = () => {
    window.navigator.clipboard.writeText(password);
    toast("Password copied to clipboard!");
  };

  useEffect(() => {
    generatePassword();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [passwordLen, isNumAllowed, isSpCharAllowed]);

  return (
    <div className="w-full h-screen bg-gray-400 flex items-center justify-center">
      <ToastContainer
        autoClose={2500}
        hideProgressBar={true}
        newestOnTop={false}
      />
      <div className="w-full max-w-md shadow-md rounded-md px-4 py-4 bg-gray-700 text-orange-500">
        <h1 className="text-white text-center my-3">Password Generator</h1>
        <div className="flex shadow rounded-lg overflow-hidden mb-4">
          <input
            type="text"
            value={password}
            className="outline-none w-full py-1 px-3 text-orange-500"
            placeholder="Password"
            readOnly
            ref={passwordRef}
          />
          <button
            onClick={copyPasswordToClipboard}
            className="outline-none bg-blue-700 text-white px-3 py-0.5 shrink-0"
          >
            Copy
          </button>
        </div>
        <div className="flex flex-col text-sm gap-y-2">
          <div className="flex items-center gap-x-2">
            <select
              value={passwordLen}
              className="cursor-pointer"
              onChange={(e) => setPasswordLen(e.target.value)}
            >
              {Array.from({ length: 23 }, (_, i) => i + 8).map((value) => (
                <option key={value} value={value}>
                  {value}
                </option>
              ))}
            </select>
            <label htmlFor="length">Password Length</label>
          </div>
          <div className="flex items-center gap-x-2">
            <input
              type="checkbox"
              defaultChecked={isNumAllowed}
              onChange={() => {
                setIsNumAllowed((prev) => !prev);
              }}
              name=""
              id=""
            />
            <label htmlFor="number">Include Numbers</label>
          </div>
          <div className="flex items-center gap-x-2">
            <input
              type="checkbox"
              defaultChecked={isSpCharAllowed}
              onChange={() => {
                setIsSpCharAllowed((prev) => !prev);
              }}
              name=""
              id=""
            />
            <label htmlFor="charInput">Include Special Characters</label>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
