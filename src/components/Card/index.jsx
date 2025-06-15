import classNames from "classnames";
import { useEffect, useState } from "react";
import { FaChevronDown } from "react-icons/fa";

const Card = ({ title, isOpen = false, children, onToggle = () => {} }) => {
  const [isActive, setIsActive] = useState(isOpen);

  useEffect(() => {
    setIsActive(isOpen);
  }, [isOpen]);

  const handleToggle = () => {
    setIsActive(!isActive);
    if(onToggle){
      onToggle(!isActive);
    }
  };

  return (
    <div className="flex flex-col p-4 gap-4 w-full rounded shadow">
      <div
        className="flex flex-col w-full gap-1 hover:cursor-pointer hover:opacity-85"
        onClick={handleToggle}
      >
        <div className="flex items-center text-sky-800 justify-between">
          <span className="font-bold text-xl">{title ?? ""}</span>
          <span
            className={`transition-transform duration-300 ${
              isActive ? "rotate-180" : ""
            }`}
          >
            <FaChevronDown size={16} />
          </span>
        </div>
        <hr />
      </div>

      <div
        className={classNames(
          "overflow-hidden transition-[max-height] duration-1000 ease-in-out",
          isActive ? "max-h-[1000px]" : "max-h-0"
        )}
      >
        {isActive && children}
      </div>
    </div>
  );
};

export default Card;
