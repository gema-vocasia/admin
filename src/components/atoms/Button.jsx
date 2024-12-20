const Button = ({ type, children, onClick, className }) => {
  return (
    <button
      type={type}
      onClick={onClick}
      className={`w-2/3 h-12 bg-[#5E84C5] text-white rounded-xl hover:bg-[#4B6CA0] transform hover:scale-105 transition duration-300 text-lg font-semibold ${className}`}
    >
      {children}
    </button>
  );
};

export default Button;
