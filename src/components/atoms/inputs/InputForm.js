const InputForm = ({
  id,
  label,
  className,
  classNameError,
  LabelStyle,
  required,
  error,
  register,
  type,
  disabled,
  borderButtom,
  placeholder,
}) => {
  const labelStyle = LabelStyle
    ? `text-left md:text-base ${LabelStyle}`
    : 'text-left md:text-base';
  const inputStyle = className
    ? `${className}`
    : 'text-left border border-slate-300 rounded-md px-2 h-8 mt-3 w-full hover:border-[#142C45] focus:border-[#142C45] active:border-[#142C45]';
  return (
    <>
      <div className='flex items-center mt-3'>
        <label className={labelStyle}>{label}</label>
        {required && <div className='text-red-600 text-2xl'>&nbsp;*</div>}
      </div>
      <input
        placeholder={placeholder ?? placeholder}
        type={type}
        className={
          error
            ? classNameError
              ? classNameError
              : `text-left text-red-600 border ${
                  borderButtom ? 'border-b-red-600' : 'border-red-600'
                } rounded-md px-2 h-8 mt-3 w-full hover:border-red-600 focus:outline-none focus:ring-0 focus:border-red-600 active:border-red-600`
            : inputStyle
        }
        id={id}
        {...register(id)}
        disabled={disabled}
      />
      <p className='text-sm text-red-600 mt-1'>{error?.message}</p>
    </>
  );
};

export default InputForm;
