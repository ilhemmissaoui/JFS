const Button = ({ type, onClick, children, className, disabled, color }) => {
  const bgColor =
    color === 'blue'
      ? 'bg-[#142C45] text-white'
      : color === 'red'
      ? 'bg-[#EC907B] text-white'
      : !color
      ? 'bg-white text-[#132C45]'
      : color;

  return (
    <button
      className={
        disabled
          ? `${className} rounded-lg shadow opacity-50 ${bgColor}`
          : `rounded-lg shadow ${className} ${bgColor}`
      }
      type={type}
      onClick={onClick ?? onClick}
      disabled={disabled}
    >
      {children}
    </button>
  );
};
export default Button;
