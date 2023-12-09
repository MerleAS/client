"use client";

import { useState } from "react";

import ArrowUp from "../../public/icons/SVG/arrowUp.svg";
import ArrowDown from "../../public/icons/SVG/arrowDown.svg";

const DropDown = ({ children, placeholder, className }) => {
  const [isActive, setIsActive] = useState(false);

  return (
    <div
      className={`w-full min-h-12 h-fit border border-gray-500 my-[4%] hover:scale-[102%] ${className}`}
    >
      <div
        className="h-12 w-full flex justify-between items-center p-4"
        onClick={() => setIsActive((prev) => !prev)}
      >
        <h3>{placeholder}</h3>
        <div className="h-full flex items-center justify-center">
          {isActive && <ArrowUp height="20" width="20" className="hover:scale-110" />}
          {!isActive && <ArrowDown height="20" width="20" className="hover:scale-110" />}
        </div>
      </div>
      {isActive && <div className="p-4">{children}</div>}
    </div>
  );
};

export default DropDown;
