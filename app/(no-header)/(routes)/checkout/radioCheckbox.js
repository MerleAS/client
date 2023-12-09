"use client"

import RadioButton from "../../../../components/UI/radioButton";

const RadioCheckbox = ({ optionList, radioValue, setRadioValue, title }) => {
  return (
    <div className="w-full h-64">
      <div className="h-[22.5%] w-full mx-[5%]">
        <p className="text-xl font-medium m-0">{title}</p>
      </div>
      <div className="h-[77.5%] w-full border border-gray-300 rounded-sm">
        {optionList.length > 0 &&
          optionList.map((option, index) => {
            return (
              <div className="h-1/2 w-full flex flex-row px-[2%]" key={index}>
                <RadioButton
                  value={option.value}
                  radioValue={radioValue}
                  setRadioValue={setRadioValue}
                  price={option.price}
                />
                <div className="w-3/5 space-y-2 flex flex-col justify-center">
                  <p className="text-md font-medium m-0">{option.label}</p>
                  <p className="text-xs text-gray-500 m-0 font-light">{option.description}</p>
                </div>
                <div className="w-1/5 flex items-center justify-end mr-[2%]">
                  <p className="text-md m-0 font-light">{option.price} {title === "Shipping" && "kr"}</p>
                </div>
                <div className="w-[10%] flex items-center justify-center">{option.icon}</div>
              </div>
            );
          })}
      </div>
    </div>
  );
};

export default RadioCheckbox;
