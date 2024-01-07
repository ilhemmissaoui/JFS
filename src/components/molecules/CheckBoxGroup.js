import CheckBox from '../atoms/inputs/CheckBox';

function CheckBoxGroup({
  checkboxes,
  setCheckboxes,
  classNameParent,
  classNameItems,
  permissions,
}) {
  const handleCheckboxChange = (checkboxId) => {
    if (checkboxes.includes(checkboxId)) {
      const newArray = checkboxes.filter((checkbox) => checkbox !== checkboxId);
      setCheckboxes(newArray);
    } else {
      setCheckboxes([...checkboxes, checkboxId]);
    }
  };

  return (
    <div
      className={
        classNameParent ? classNameParent : `flex flex-col gap-3` + 'mt-4'
      }
    >
      {permissions?.map((permission, index) => (
        <CheckBox
          key={permission.id}
          className={classNameItems ?? classNameItems}
          label={permission.name}
          onChange={() => handleCheckboxChange(permission.id)}
        />
      ))}
    </div>
  );
}

export default CheckBoxGroup;
