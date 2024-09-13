import React from 'react'
import { useState, useEffect } from 'react'
import Hamburger from 'hamburger-react'
import Login from './Login'
import SignUp from './SignUp'


const NeWNav = () => {
    const [logoCol, setLogoCol] = useState(false);
    const [bgColor, setBgColor] = useState("bg-transparent");
    const [textCol, setTextCol] = useState("text-white");
    const [isOpen, setOpen] = useState(false);  
    const [login, setLogin] = useState(false);
    const [signUp, setSign] = useState(false);



    useEffect(() => {
        const handleScroll = () => {
          if (window.scrollY > 150) {
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
    <nav className={`h-max w-screen ${bgColor} ${textCol} fixed z-10 transition-all ease-in-out duration-500`}>

      {login && <Login 
          onDelete = {() => setLogin(false)}
          next = {() => (setSign(true), setLogin(false))}
      />}
            {signUp && <SignUp 
          onDelete = {() => setSign(false)}
          next = {() => (setSign(false), setLogin(true))}


      />}

        <div className="max-w-7xl min-w-full mx-auto px-4 sm:px-6 lg:px-8 py-4 border-b
         border-b-white transition-all ease-in-out duration-500 ">
            <div className="flex justify-around items-center h-16 transition-all ease-in-out duration-500">
                <div className="flex items-center">
                    <a href="#" className="text-2xl font-bold">
                    Baymax
                    </a>
                </div>
        
                <div className="hidden lg:flex space-x-10 items-center ml-11 transition-all ease-in-out duration-500">
                    <a href="#" className="text-xl hover:underline">
                    Home
                    </a>
                    <a href="#about" className="text-xl hover:underline cursor-pointer">
                    About
                    </a>
                    <a href="#faq" className="text-xl hover:underline cursor-pointer">
                    FAQ
                    </a>
                    <a href="#contact" className="text-xl hover:underline cursor-pointer">
                    Contact
                    </a>
                </div>

                {!logoCol ? (
            <div className="hidden lg:flex space-x-4 transition-all ease-in-out duration-500">
              <a
                href="#"
                className="bg-transparent px-8 py-2 hover:bg-white border 
                 border-white hover:text-black text-white rounded-full transition-all duration-500 ease-in-out"
                 onClick={() => (setLogin(true))}
              >
                Login
              </a>
              <a
                href="#"
                className="bg-transparent px-8 py-2 hover:bg-white border
                 border-white hover:text-black text-white rounded-full transition-all duration-500 ease-in-out"
                 onClick={() => (setSign(true))}

              >
                Sign Up
              </a>
            </div>
          ) : (
            <div className="hidden lg:flex space-x-4">
              <a
                href="#"
                className="bg-transparent px-8 py-2 hover:bg-[#283448] 
                border border-black hover:text-white text-black rounded-full transition-all duration-500 ease-in-out"
                onClick={() => (setLogin(true))}
              >
                Login
              </a>
              <a
                href="#"
                className="bg-transparent px-8 py-2 hover:bg-[#283448] 
                border border-black hover:text-white text-black rounded-full transition-all duration-500 ease-in-out"
                onClick={() => (setSign(true))}

              >
                Sign Up
              </a>
            </div>
          )}

<div className="flex items-center lg:hidden">
            <button
              onClick={toggleMenu}
              className={`${(login || signUp) ? `hidden` : `block`}`}
            >
              <Hamburger toggled={isOpen} toggle={setOpen} />
            </button>
          </div>

            {isOpen && (
              <div className="lg:hidden flex flex-col space-y-4 absolute top-16 
             bg-white w-[80%] p-4 rounded-lg text-black mt-10 ">
                <a href="#" className="text-xl bg-[#263145] p-2 rounded-lg text-white" >
                  Home
                </a>
                <a href="#about" className="text-xl bg-[#263145] p-2 rounded-lg text-white">
                  About
                </a>
                <a href="#faq" className="text-xl hover:underline text-white bg-[#263145] p-2 rounded-lg">
                  FAQ
                </a>
                <a href="#contact" className="text-xl bg-[#263145] p-2 rounded-lg text-white">
                  Contact
                </a>

                <a
                    href="#"
                    className="bg-transparent px-8 py-2 hover:bg-[#283448] border text-center
                     border-black hover:text-white text-black rounded-full transition-all duration-500 ease-in-out"
                     onClick={() => (setLogin(true), setOpen(false))}
                >
                    Login
                </a>
                <a
                    href="#"
                    className="bg-transparent px-8 py-2 hover:bg-[#283448] border text-center
                     border-black hover:text-white text-black rounded-full transition-all duration-500 ease-in-out"
                     onClick={() => (setSign(true), setOpen(false))}

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
