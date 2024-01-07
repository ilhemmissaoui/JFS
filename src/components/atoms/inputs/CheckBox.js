const CheckBox = ({
  label,
  isChecked,
  onChange,
  labelClassName = '',
  inputClassName = '',
  disabled,
}) => {
  const labelStyle = labelClassName
    ? `text-left flex justify-left items-center gap-3 ${labelClassName}`
    : 'text-left flex justify-left items-center gap-3';

  return (
    <label className={labelStyle}>
      <input
        disabled={disabled ?? disabled}
        type='checkbox'
        className={`h-4 w-4 rounded-md accent-[#132C45] ${inputClassName} disabled:opacity-100`}
        checked={isChecked}
        onChange={onChange}
        id='orange-checkbox'
      />
      {label}
    </label>
  );
};

export default CheckBox;
