import RadioButton from "../UI/radioButton";
import classes from "../../styles/components/views/radioCheckbox.module.css";

const RadioCheckbox = ({ optionList, radioValue, setRadioValue, title }) => {
  return (
    <>
      <div className={classes.heading}>
        <p className={classes.textBoldLarge}>{title}</p>
      </div>
      <div className={classes.container}>
        {optionList.length > 0 &&
          optionList.map((option, index) => {
            return (
              <div className={classes.shippingOptionContainer} key={index}>
                <RadioButton
                  value={option.value}
                  radioValue={radioValue}
                  setRadioValue={setRadioValue}
                  price={option.price}
                />
                <div className={classes.shippingInfo}>
                  <p className={classes.textBold}>{option.label}</p>
                  <p className={classes.textGrey}>{option.description}</p>
                </div>
                <div className={classes.shippingPrice}>
                  <p className={classes.text2}>{option.price} {title === "Shipping" && "kr"}</p>
                </div>
                <div className={classes.shippingIcon}>{option.icon}</div>
              </div>
            );
          })}
      </div>
    </>
  );
};

export default RadioCheckbox;
