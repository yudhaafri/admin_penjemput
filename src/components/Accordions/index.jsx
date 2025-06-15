import React, { useState } from "react";
import { FaChevronDown } from "react-icons/fa";

const Accordion = ({ items }) => {
  const [activeIndex, setActiveIndex] = useState(0);

  const handleToggle = (index) => {
    setActiveIndex(activeIndex === index ? null : index);
  };

  return (
    <div className="w-full mx-auto bg-white">
      {items.map((item, index) => (
        <div
          key={index}
          className={`${
            activeIndex === index ? "bg-[#F4F4F4]" : ""
          } rounded-xl hover:bg-gray-100`}
        >
          <button
            className={`flex ${
              activeIndex === index ? "border-b-[3px] border-primary-700" : ""
            } justify-between py-4 mx-5 text-left text-primary-700 font-bold`}
            style={{ width: "-webkit-fill-available" }}
            onClick={() => handleToggle(index)}
          >
            <span>{item.title}</span>
            <span
              className={`transition-transform ${
                activeIndex === index ? "rotate-180" : ""
              }`}
            >
              <FaChevronDown
                color={activeIndex === index ? "#314F84" : "#AEAEB3"}
                size={"18px"}
              />
            </span>
          </button>
          <div
            className={`overflow-hidden transition-[max-height] duration-300 ${
              activeIndex === index ? "max-h-screen" : "max-h-0"
            }`}
          >
            <div className="p-5">
              {typeof item.body === "function" ? item.body() : item.body}
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default Accordion;
