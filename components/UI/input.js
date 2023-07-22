import classes from "../../styles/components/UI/input.module.css";

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

  const inputStyles = value !== ""
    ? `${classes.input} ${classes.hasInput}`
    : `${classes.input}`;
  const labelStyles = value !== ""
    ? `${classes.label} ${classes.hasInputLabel} `
    : `${classes.label}`;

  return (
    <div className={`${classes.container} ${containerClass}`}>
      <input
        type={type}
        onChange={onChange}
        onBlur={onBlur}
        value={value}
        placeholder={label}
        className={`${inputStyles} ${inputClass}`}
      />
      <label className={`${labelStyles} ${labelClass}`}>
        <p className={classes.labelText}>{label}</p>
      </label>
    </div>
  );
};

export default Input;
