const Input = ({
  type,
  name,
  value,
  placeholder,
  onChange,
  className,
  disabled,
}) => {
  return (
    <input
      type={type}
      name={name}
      value={value}
      placeholder={placeholder}
      onChange={onChange}
      disabled={disabled}
      className={`w-full p-3 rounded-lg text-black border-2 border-[#5E84C5] focus:outline-none focus:ring focus:ring-blue-200 ${className}`}
    />
  );
};

export default Input;
