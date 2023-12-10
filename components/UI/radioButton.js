const RadioButton = ({ setValue, price, value, radioValue, id }) => {
  const changeHandler = (e) => {
    if (price && typeof radioValue === "object") {
      setValue(id, { label: e.target.value, price: price });
    } else {
      setValue(id, e.target.value);
    }
  };

  return (
    <div className="flex w-[10%] items-center justify-center mr-[2%]">
      <div className="flex items-center justify-center border border-black h-[18px] w-[18px] rounded-[50%]">
        <label
          className={`flex items-center justify-center w-3 h-3 bg-white rounded-[50%] ${
            radioValue.label === value || radioValue === value
              ? "bg-white rounded-[50%] border-[3px solid black] inline-block"
              : ""
          }`}
        >
          <input
            type="radio"
            id={value}
            value={value}
            name={value}
            checked={radioValue.label === value || radioValue === value}
            onChange={(e) => changeHandler(e)}
            className={`${
              radioValue.label === value || radioValue === value
                ? "hidden"
                : "hidden"
            }`}
          />

          <span
            className={`w-3 h-3 bg-white rounded-[50%] inline-block ${
              radioValue.label === value || radioValue === value
                ? "!bg-black border-[3px solid white] rounded-[50%] inline-block"
                : ""
            } `}
          ></span>
        </label>
      </div>
    </div>
  );
};

export default RadioButton;