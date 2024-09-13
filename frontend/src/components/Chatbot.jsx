import React, { useState } from 'react';

const Chatbot = () => {
const API_KEY = import.meta.env.VITE_GEMINI_KEY;
const API_URL = `https://generativelanguage.googleapis.com/v1/models/gemini-pro:generateContent?key=${API_KEY}`;
  const [showPopover, setShowPopover] = useState(false);
  const [chatInput, setChatInput] = useState('');
  const [chatHistory, setChatHistory] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [chatview, setChatview] = useState(false);


  const handleChatSubmit = async (e) => {
    e.preventDefault();
    if (!chatInput) return;

    setIsLoading(true);

    setChatHistory((prev) => [...prev, { sender: 'user', message: chatInput }]);

    try {
      const response = await fetch(API_URL, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          contents: [{ 
            role: "user", 
            parts: [{ text: `${chatInput}` }] 
          }] 
        }),
      });

      const data = await response.json();
      console.log(data)

      setChatHistory((prev) => [...prev, { sender: 'baymax', message: data?.candidates[0]?.content?.parts[0].text.replace(/\*\*(.*?)\*\*/g, '$1') || 'Sorry, I could not understand that.' }]);
    } catch (error) {
      setChatHistory((prev) => [...prev, { sender: 'baymax', message: 'Oops! Something went wrong.' }]);
    } finally {
      setIsLoading(false);
      setChatInput(''); 
    }
  };

  return (
    <div
      className='z-100 fixed bottom-0 right-0 cursor-pointer drop-shadow-glow'
    >
      {/* Popover */}
      <div
        id="popover-default"
        role="tooltip"
        className={`absolute bottom-36 right-3 z-10 ${showPopover ? 'visible opacity-100' : 'invisible opacity-0'} 
        inline-block w-64 text-sm text-gray-500 transition-opacity duration-300 bg-white border 
        border-gray-200 rounded-lg shadow-sm dark:text-gray-400 dark:border-gray-600 dark:bg-gray-800`}
      >
        <div className="px-3 py-2 bg-gray-100 border-b border-gray-200 rounded-t-lg dark:border-gray-600 dark:bg-gray-700">
          <h3 className="font-semibold text-gray-900 dark:text-white">Your AI doctor</h3>
        </div>
        <div className="px-3 py-2">
          <p>Hi! I am Dr. Baymax. Ask your health-related doubts from me!</p>
        </div>
        <div data-popper-arrow></div>
      </div>

      {/* Chatbot Logo */}
      <img
        src="src/assets/images/logo.png"
        alt="Baymax"
        width={100}
        className=''
        onClick={() => setChatview((prevalue) => !prevalue)}
        onMouseEnter={() => setShowPopover(true)}
        onMouseLeave={() => setShowPopover(false)}
  
      />

      {/* Chat Window */}
      {chatview && (
        <div className="absolute bottom-36 right-3 bg-white p-4 border border-gray-300 shadow-lg rounded-lg w-80">
          <div className="chat-history overflow-y-auto h-72">
            {chatHistory.map((chat, index) => (
              <div key={index} className={`my-2 ${chat.sender === 'user' ? 'text-right' : 'text-left'}`}>
                <span
                  className={`inline-block px-3 py-1 rounded-lg ${
                    chat.sender === 'user' ? 'bg-blue-500 text-white' : 'bg-gray-300'
                  }`}
                >
                  {chat.message}
                </span>
              </div>
            ))}
          </div>

          {/* Loading Indicator */}
          {isLoading && <p className="text-center text-gray-400">Loading...</p>}

          {/* Input Box */}
          <form onSubmit={handleChatSubmit} className="mt-2">
            <input
              type="text"
              value={chatInput}
              onChange={(e) => setChatInput(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none"
              placeholder="Ask something..."
            />
            <button
              type="submit"
              className="w-full mt-2 bg-blue-500 text-white py-2 rounded-lg hover:bg-blue-600 transition"
            >
              Send
            </button>
          </form>
        </div>
      )}
    </div>
  );
};

export default Chatbot;