import React from 'react'
import { useState, useEffect } from 'react'
import Hamburger from 'hamburger-react'

const NeWNav = () => {
    const [logoCol, setLogoCol] = useState(false);
    const [bgColor, setBgColor] = useState("bg-transparent");
    const [textCol, setTextCol] = useState("text-slate-50");
    const [isOpen, setOpen] = useState(false);  

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
        setOpen(!isOpen);
      };
    
  return (
    <nav className={`h-max w-screen ${bgColor} ${textCol} fixed z-10`}>
        <div className="max-w-7xl min-w-full mx-auto px-4 sm:px-6 lg:px-8 py-4 border-b
         border-b-white transition-all ease-in-out duration-500">
            <div className="flex justify-around items-center h-16">
                <div className="flex items-center">
                    <a href="#" className="text-2xl font-bold">
                    Baymax
                    </a>
                </div>
        
                <div className="hidden md:flex space-x-10 items-center ml-11">
                    <a href="#" className="text-xl hover:underline">
                    Home
                    </a>
                    <a className="text-xl hover:underline cursor-pointer">
                    About
                    </a>
                    <a className="text-xl hover:underline cursor-pointer">
                    FAQ
                    </a>
                    <a className="text-xl hover:underline cursor-pointer">
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

<div className="flex items-center md:hidden">
            <button
              onClick={toggleMenu}
              className="focus:outline-none"
            >
              <Hamburger toggled={isOpen} toggle={setOpen} />
            </button>
          </div>

            {isOpen && (
              <div className="md:hidden flex flex-col space-y-4 absolute top-16 
             bg-white w-[80%] p-4 rounded-lg text-black mt-10 ">
                <a href="#" className="text-xl bg-[#263145] p-2 rounded-lg text-white" >
                  Home
                </a>
                <a href="#" className="text-xl bg-[#263145] p-2 rounded-lg text-white">
                  About
                </a>
                <a href="#" className="text-xl hover:underline text-white bg-[#263145] p-2 rounded-lg">
                  FAQ
                </a>
                <a href="#" className="text-xl bg-[#263145] p-2 rounded-lg text-white">
                  Contact
                </a>

                <a
                    href="#"
                    className="bg-transparent px-8 py-2 hover:bg-[#283448] border text-center
                     border-black hover:text-white text-black rounded-full transition-all duration-500 ease-in-out"
                >
                    Login
                </a>
                <a
                    href="#"
                    className="bg-transparent px-8 py-2 hover:bg-[#283448] border text-center
                     border-black hover:text-white text-black rounded-full transition-all duration-500 ease-in-out"
                >
                    Sign Up
                </a>
              </div>
            )}

            </div>
        </div>
    </nav>
  )
}

export default NeWNav