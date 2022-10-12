import classes from "../../styles/components/UI/selectButton.module.css";

const SelectButton = (props) => {
  const {
    children,
    dropdownActive,
    setDropdownActive,
    options,
    type,
    placeholder,
  } = props;

  return (
    <div
      className={classes.container}
      onClick={() => setDropdownActive((prev) => !prev)}
    >
      <p className={classes.text}>{placeholder}</p>
      <svg
        className={classes.dropdownIndicator}
        width="16"
        height="9"
        viewBox="0 0 12 7"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M0.400123 0C0.502435 0 0.604747 0.0427242 0.682871 0.128173L6.00003 5.94386L11.3172 0.128173C11.4734 -0.0427242 11.7266 -0.0427242 11.8828 0.128173C12.0391 0.299069 12.0391 0.575922 11.8828 0.746819L6.28284 6.87183C6.12659 7.04272 5.87341 7.04272 5.71716 6.87183L0.117187 0.746819C-0.0390623 0.575922 -0.0390623 0.299069 0.117187 0.128173C0.195436 0.0427242 0.297811 0 0.400123 0Z"
          fill="white"
        />
      </svg>
      {dropdownActive && (
        <div className={classes.dropdownContainer}>
          {type === "select" &&
            options.map((item) => {
              return (
                <div className={classes.option}>
                  <p>Size : {item.size}</p>
                  <p>In stock : {item.in_stock}</p>
                </div>
              );
            })}
          {type === "info" && (
            <div className={classes.descriptionContainer}>{children}</div>
          )}
        </div>
      )}
    </div>
  );
};

export default SelectButton;
