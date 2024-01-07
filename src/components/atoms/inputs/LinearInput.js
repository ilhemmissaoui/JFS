const LinearInput = ({
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
}) => {
  const labelStyle = LabelStyle ? `text-left ${LabelStyle}` : 'text-left';
  const inputStyle = className
    ? `${className}`
    : 'text-left border-b-2 border-slate-300 px-2 h-8 mt-3 w-full hover:outline-none focus:outline-none active:outline-none';
  return (
    <>
      <div className='flex items-center mt-3'>
        <label className={labelStyle}>{label}</label>
        {required && <div className='text-red-600 text-2xl'>&nbsp;*</div>}
      </div>
      <input
        type={type}
        className={
          error
            ? 'text-left border-b-red-600 border-b-2 text-red-600 px-2 h-8 mt-3 w-full hover:border-red-60border-b-red-6000 focus:border-red-600 active:border-red-600 hover:outline-none focus:outline-none active:outline-none'
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

export default LinearInput;
