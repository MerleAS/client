"use client";

import { useState } from "react";
import ArrowDown from "../../public/icons/SVG/arrowDown.svg";
import ArrowUp from "../../public/icons/SVG/arrowUp.svg";

const Select = ({ options, className, placeholder, setValue }) => {
  const [isActive, setIsActive] = useState(false);
  const [selected, setSelected] = useState("");

  const clickHandler = (option) => {
    setValue("country", option);
    setSelected(option);
    setIsActive(false);
  };

  return (
    <div className="relative w-full">
      <div
        className={`w-full h-12 border border-gray-500 rounded-sm ${className}`}
      >
        <div
          className="h-12 w-full flex justify-between items-center p-4"
          onClick={() => setIsActive((prev) => !prev)}
        >
          <h3>
            {selected === "" && placeholder}
            {selected && selected}
          </h3>
          <div className="h-full flex items-center justify-center">
            {isActive && (
              <ArrowUp height="20" width="20" className="hover:scale-110" />
            )}
            {!isActive && (
              <ArrowDown height="20" width="20" className="hover:scale-110" />
            )}
          </div>
        </div>
      </div>
      {isActive && (
        <div className="absolute bg-white top-16 border p-2 border-gray-500 rounded-sm w-full z-10 shadow-md space-y-1">
          {options.map((option, index) => (
            <p
              className="p-3 hover:bg-blue-900/10 rounded-lg"
              key={index}
              onClick={() => clickHandler(option)}
            >
              {option}
            </p>
          ))}
        </div>
      )}
    </div>
  );
};

export default Select;

/* <select
        className="w-full p-3 border border-black appearance-none"
        {...register("country")}
      >
        {options.map((option) => (
          <option key={option} value={option}>
            {option}
          </option>
        ))}
      </select>
      <span className="absolute top-1/2 right-0 -translate-y-1/2 flex items-center justify-center h-10 w-10 pointer-events-none">
        <ArrowDown height="20" width="20"/>
      </span> */
