import classes from "../../styles/components/UI/incrementInput.module.css";

const IncrementInput = (props) => {
  const { count, setCount } = props;

  const decrementHandler = () => {
    if(count > 1) {
        setCount((prev) => prev - 1, 'decrement')
    }
  };

  const incrementHandler = () => {
    if (count < 10) {
        setCount(prev => prev + 1, 'increment')
    }
  };  

  return (
    <div className={classes.container}>
      <button
        onClick={decrementHandler}
        className={classes.button}
      >
        -
      </button>
      <p className={classes.count}>{count}</p>
      <button
        onClick={incrementHandler}
        className={classes.button}
      >
        +
      </button>
    </div>
  );
};

export default IncrementInput;
