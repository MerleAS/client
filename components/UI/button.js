const Button = ({ children, className, onClick, type }) => {
  return (
    <button
      className={`px-4 py-2 text-white bg-black hover:opacity-80 rounded-sm ${className}`}
      onClick={onClick}
      type={type}
    >
      {children}
    </button>
  );
};

export default Button;
