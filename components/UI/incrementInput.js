const IncrementInput = ({ count, setCount }) => {
  const decrementHandler = () => {
    if (count > 1) {
      setCount((prev) => prev - 1, "decrement");
    }
  };

  const incrementHandler = () => {
    if (count < 10) {
      setCount((prev) => prev + 1, "increment");
    }
  };

  return (
    <div className="h-6 w-fit flex items-center justify-between flex-row border-2 border-black rounded-sm px-2 py-1 space-x-2">
      <button
        onClick={decrementHandler}
        className="w-4 text-black bg-transparent text-lg border-hidden"
      >
        -
      </button>
      <p className="text-md text-center outline-none border-0">{count}</p>
      <button
        onClick={incrementHandler}
        className="w-4 text-black bg-transparent text-lg border-0"
      >
        +
      </button>
    </div>
  );
};

export default IncrementInput;
