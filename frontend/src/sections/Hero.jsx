import React from "react";
import smallpic from "../assets/images/smallpic.png";

const Hero = () => {
  return (
    <section>
      <div className="bg-gradient-to-r from-slate-900 to-slate-700 h-[80vh] 
      lg:h-screen w-screen flex flex-col-reverse lg:flex-row justify-center items-center relative">
        <div className="w-full lg:w-auto">
          <img
            src={smallpic}
            alt="Small Pic"
            className="h-40 w-auto lg:h-auto absolute bottom-0 right-0"
          />
        </div>

        <div className="w-full text-center px-4 lg:px-0">
          <h1 className="text-8xl max-sm:text-5xl font-bold text-white mt-8 font-custom">
            Welcome to Baymax
          </h1>
          <p className="mt-4 text-white text-lg lg:text-2xl font-futura lg:mt-8">
            Your personal healthcare companion
          </p>
          <a href="#working" className="inline-block text-sm font-futura lg:text-lg px-4 py-2 lg:px-8 lg:py-4 
          text-center bg-transparent hover:bg-white text-white hover:text-black border border-white
           rounded-full mt-14 transition all ease-in-out duration-500 shadow-[0_0_15px_5px_rgba(255,255,255,0.5)] "> Try It Now!</a>

</div>
      </div>
    </section>
  );
};

export default Hero;
