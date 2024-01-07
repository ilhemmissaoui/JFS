import React from 'react';
import Select from 'react-select';

const SelectMulti = ({
  LabelStyle,
  label,
  className,
  id,
  options,
  value,
  required,
  error,
  onChange,
}) => {
  const optionsFields = [];
  options.map((option) =>
    optionsFields.push({
      value: option.id,
      label: option.name,
    })
  );

  const labelStyle = LabelStyle ? `$text-left ${LabelStyle}` : 'text-left';
  const selectStyle = className
    ? `${className}`
    : 'mt-3 w-full hover:border-[#142C45] focus:border-[#142C45] active:border-[#142C45]';
  return (
    <>
      <div className='flex items-center mt-3'>
        <label className={labelStyle}>{label}</label>
        {required && <div className='text-red-600 text-xl'>&nbsp;*</div>}
      </div>
      <Select
        className={
          error
            ? 'text-left bg-white text-red-600 border border-red-600 rounded-md px-2 h-8 mt-3 w-full hover:border-red-600 focus:outline-none focus:ring-0 focus:border-red-600 active:border-red-600'
            : selectStyle
        }
        isMulti
        options={optionsFields}
        id={id}
        value={value ?? value}
        onChange={onChange}
      />
      <p className='text-sm text-red-600 mt-1'>{error?.message}</p>
    </>
  );
};

export default SelectMulti;
