const Input = ({
  type,
  value,
  onChange,
  onBlur,
  label,
  containerClass,
  inputClass,
  labelClass,
}) => {

  return (
    <div className={`w-full relative flex ${containerClass}`}>
      <input
        type={type}
        onChange={onChange}
        onBlur={onBlur}
        value={value}
        placeholder={label}
        className={`w-full py-[10px] pl-[15px] text-black border border-gray-400 ${value !== "" ? "!pt-4 !pb-1": ""} ${inputClass}`}
      />
      <label
        className={`absolute top-[12px] left-[15px] opacity-0 bg-transparent transform -translate-y-1/2 transition-transform duration-300 ease-in-out 
        ${value !== "" ? "!-translate-y-[70%] !opacity-100" : ""}
        ${labelClass}`}
      >
        <p className="!text-[8px] !text-[#717171] !m-0 !font-light">{label}</p>
      </label>
    </div>
  );
};

export default Input;
