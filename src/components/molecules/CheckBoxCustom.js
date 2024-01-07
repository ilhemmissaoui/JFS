import CheckBox from '../atoms/inputs/CheckBox';

function CheckBoxCustom({
  checkboxes,
  setCheckboxes,
  classNameParent,
  classNameItems,
  permissionsByRole,
  permissions,
  disabled,
}) {
  const permissionByRoleArray = permissionsByRole.map((el) => el.id);

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
      {permissions?.map((permission) => {
        return (
          <CheckBox
            disabled={disabled}
            key={permission.id}
            className={classNameItems ?? classNameItems}
            label={permission.name}
            isChecked={permissionByRoleArray.includes(permission.id)}
            onChange={() => handleCheckboxChange(permission.id)}
          />
        );
      })}
    </div>
  );
}

export default CheckBoxCustom;
