import React from "react";
import { faq } from "../constants";
import Plus from "../components/Plus";
import { useState } from "react";

const FAQ = () => {
  const [faq1, setFaq] = useState(faq);

  function handleClick(text) {
    setFaq((oldfaq) =>
      oldfaq.map((qaf) =>
        qaf.head === text ? { ...qaf, hidden: !qaf.hidden } : qaf
      )
    );
  }

  return (
    <section className="min-h-max w-screen flex flex-col justify-center lg:px-16 px-8 py-16 
    bg-[#e2e8f0]  text-[#293549]" id="faq">
      <div className="flex items-center justify-center">
        <p className="font-custom lg:text-6xl font-bold text-4xl text-center">Frequently Asked Questions</p>
      </div>

      <div className="flex max-sm:flex-col mt-20 max-md:mt-14 gap-10">
                <div className="w-[40%] bg-cover bg-top rounded-lg"
        style={{backgroundImage: "url('images/faq.jpg')"}}
        ></div>


        <div className="w-[50%] max-sm:w-full">
          <div className="border-t border-[#293549] my-6"></div>
          {faq1.map((faq) => (
            <div>
              <div className="flex justify-between">
                <p className="font-custom lg:text-2xl text-xl font-bold">{faq.head}</p>
                <div onClick={() => handleClick(faq.head)}>
                  <Plus />
                </div>
              </div>
              <div
                className={`transition-all duration-500 ease-in-out overflow-hidden ${
                  faq.hidden ? "max-h-0" : "max-h-[200px]"
                }`}
              >
                <p className="font-futura lg:text-lg text-slate-700 text-sm">{faq.text}</p>
              </div>              <div className="border-t border-[#293549] my-6"></div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default FAQ;
