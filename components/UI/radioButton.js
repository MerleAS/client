import classes from '../../styles/components/UI/radioButton.module.css';

const RadioButton = ({ value, radioValue, setRadioValue, price }) => {
  return (
    <div className={classes.radioButtonContainer}>
      <div className={classes.innerRadioButtonContainer}>
        <label className={classes.radioButton}>
          <input
            type="radio"
            id={value}
            value={value}
            name={value}
            checked={radioValue.label === value || radioValue === value}
            onChange={(e) => setRadioValue({label: e.target.value, price: price})}
          />
          <span className={classes.radioCheckmark}></span>
        </label>
      </div>
    </div>
  );
};

export default RadioButton;
