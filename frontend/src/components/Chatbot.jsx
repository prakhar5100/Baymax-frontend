import React, { useState } from 'react';

const Chatbot = () => {
  const [showPopover, setShowPopover] = useState(false);

  return (
    <div className='z-100 fixed bottom-0 right-0 cursor-pointer drop-shadow-glow'         onMouseEnter={() => setShowPopover(true)}
    onMouseLeave={() => setShowPopover(false)}
>

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
          <p>Hi! I am Dr. Baymax. Ask your health related doubts from me!</p>
        </div>
        <div data-popper-arrow></div>
      </div>

      <img
        src="src/assets/images/logo.png"
        alt=""
        width={100}
        className=''
        onClick={() => setShowPopover(prevalue => (!prevalue))}

      />

    </div>
  );
};

export default Chatbot;
