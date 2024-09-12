import { useState, useEffect } from "react";

const Navbar = () => {
  const [bgColor, setBgColor] = useState("bg-transparent");
  const [textCol, setTextCol] = useState("text-slate-50");
  const [logoCol, setLogoCol] = useState(false);

  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 250) {
        setBgColor("bg-white");
        setTextCol("text-black");
        setLogoCol(true);
      } else {
        setBgColor("bg-transparent");
        setTextCol("text-slate-50");
        setLogoCol(false);
      }
    };

    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  return (
    <nav
      className={`${bgColor} ${textCol} fixed top-0 left-0 w-full ${!logoCol ? 'min-h-28' : 'min-h-20'} shadow-lg
     z-50 border-b border-b-white transition-all duration-500 ease-in-out flex items-center`}
    >
      <div className="max-w-7xl min-w-full mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-around items-center h-16">
          <div className="flex items-center">
            <a href="#" className="text-2xl font-bold">
              {/* <img src="src/assets/images/logo.png" alt="" width={150}/> */}
              Baymax
            </a>
          </div>

          <div className="hidden md:flex space-x-10 items-center ml-11">
            <a href="#" className="text-xl hover:underline">
              Home
            </a>
            <a href="#" className="text-xl hover:underline">
              About
            </a>
            <a href="#" className="text-xl hover:underline">
              FAQ
            </a>
            <a href="#" className="text-xl hover:underline">
        Contact
      </a>
       </div>

          {!logoCol ? (
            <div className="max-sm:hidden flex space-x-4">
              <a
                href="#"
                className="bg-transparent px-8 py-2 hover:bg-white border text-xl
                 border-white hover:text-black text-white rounded-full transition-all duration-500 ease-in-out"
              >
                Login
              </a>
              <a
                href="#"
                className="bg-transparent px-8 py-2 hover:bg-white border text-xl
                 border-white hover:text-black text-white rounded-full transition-all duration-500 ease-in-out"
              >
                Sign Up
              </a>
            </div>
          ) : (
            <div className="max-sm:hidden flex space-x-4">
              <a
                href="#"
                className="bg-transparent px-8 py-2 hover:bg-[#283448] border border-black hover:text-white text-black rounded-full transition-all duration-500 ease-in-out"
              >
                Login
              </a>
              <a
                href="#"
                className="bg-transparent px-8 py-2 hover:bg-[#283448] border border-black hover:text-white text-black rounded-full transition-all duration-500 ease-in-out"
              >
                Sign Up
              </a>
            </div>
          )}

          {/* Hamburger Menu for Mobile */}
          <div className="flex items-center md:hidden">
            <button
              onClick={toggleMenu}
              className="text-gray-800 focus:outline-none"
            >
              {isOpen ? <div>Close</div> : <div>Open</div>}
            </button>
          </div>
        </div>
      </div>

      {isOpen && (
        <div> 
          <h1 className="text-6xl bg-black text-white "> Hello World </h1>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
