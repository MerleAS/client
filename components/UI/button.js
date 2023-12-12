const Button = ({ children, className, onClick, type }) => {
  return (
    <button
      className={`px-8 py-3 text-white bg-black hover:opacity-80 rounded-sm ${className}`}
      onClick={onClick}
      type={type}
    >
      {children}
    </button>
  );
};

export default Button;
