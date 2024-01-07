import Button from './atoms/buttons/Button';
import { useDispatch } from 'react-redux';

const Alert = ({
  row,
  setIsOpen,
  roleId,
  token,
  getRolesPerPage,
  deleteRole,
}) => {
  const dispatch = useDispatch();

  const handleDelete = () => {
    dispatch(deleteRole({ id: roleId, token })).then((res) => {
      if (res) {
        dispatch(getRolesPerPage({ page: 1, row, token }));
      }
      setIsOpen(false);
    });
  };
  return (
    <div className='flex justify-center items-center mt-10'>
      <div className='w-full flex justify-around items-center'>
        <Button
          className='px-4 py-2 mt-8 mb-10 w-40'
          type='submit'
          onClick={handleDelete}
          color='red'
        >
          Supprimer
        </Button>
        <Button
          className='px-4 py-2 mt-8 mb-10 w-40'
          type='submit'
          onClick={() => setIsOpen(false)}
        >
          Annuler
        </Button>
      </div>
    </div>
  );
};

export default Alert;
