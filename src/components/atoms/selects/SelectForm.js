import React from 'react';

const SelectForm = ({
  LabelStyle,
  label,
  className,
  id,
  options,
  register,
  required,
  error,
}) => {
  const labelStyle = LabelStyle ? `$text-left ${LabelStyle}` : 'text-left';
  const selectStyle = className
    ? `${className}`
    : 'text-left text-[#7B7B7B] border border-slate-300 bg-white rounded-md h-8 mt-3 px-2 w-full hover:border-[#142C45] focus:border-[#142C45] active:border-[#142C45]';
  return (
    <>
      <div className='flex items-center mt-3'>
        <label className={labelStyle}>{label}</label>
        {required && <div className='text-red-600 text-xl'>&nbsp;*</div>}
      </div>
      <select
        className={
          error
            ? 'text-left bg-white text-red-600 border border-red-600 rounded-md px-2 h-8 mt-3 w-full hover:border-red-600 focus:outline-none focus:ring-0 focus:border-red-600 active:border-red-600'
            : selectStyle
        }
        id={id}
        {...register(id)}
      >
        <option className='bg-white pt-1' value=''>
          Choisir une option
        </option>
        {options?.map((option) => (
          <option className='bg-white pt-1' key={option.uuid} value={option.id}>
            {option.name}
          </option>
        ))}
      </select>
      <p className='text-sm text-red-600 mt-1'>{error?.message}</p>
    </>
  );
};

export default SelectForm;
