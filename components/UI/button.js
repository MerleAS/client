const Button = ({ children, className, onClick, type, disabled }) => {
  return (
    <button
      className={`px-8 py-3 text-white bg-black hover:opacity-80 rounded-sm ${className}`}
      disabled={disabled || false}
      onClick={onClick}
      type={type}
    >
      {children}
    </button>
  );
};

export default Button;
