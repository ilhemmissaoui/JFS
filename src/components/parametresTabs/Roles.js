import { useEffect, useState } from 'react';
import Button from '../atoms/buttons/Button';
import Modal from '../molecules/Modal';
import AddRolesForm from '../forms/AddRolesForm';
import { useDispatch, useSelector } from 'react-redux';
import LoadingSpinner from '../LoadingSpinner';
import PaginationNav from '../molecules/PaginationNav';
import CheckBoxCustom from '../molecules/CheckBoxCustom';
import { HiOutlinePencilSquare } from 'react-icons/hi2';
import { MdDeleteForever } from 'react-icons/md';
import UpdateRoleForm from '../forms/UpdateRoleForm';
import Alert from '../Alert';
import {
  deleteRole,
  getPermissions,
  getRolesPerPage,
} from '@/store/features/role/roleSlice';
import { TbAlertTriangleFilled } from 'react-icons/tb';

const Roles = () => {
  let [isOpen, setIsOpen] = useState(false);
  let [isModalUpdateOpen, setIsModalUpdateOpen] = useState(false);
  let [isAlertOpen, setIsAlertOpen] = useState(false);

  let [selectedRole, setSelectedRole] = useState(false);

  const [checkboxes, setCheckboxes] = useState([]);
  const [active, setActive] = useState(1);
  const row = 4;

  const { user } = useSelector((state) => state.auth);
  const { lastPage, permissions, roles, isLoading } = useSelector(
    (state) => state.role
  );

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getRolesPerPage({ page: active, row, token: user?.token }));
  }, [dispatch, active]);

  const next = () => {
    if (active === lastPage) return;
    setActive(active + 1);
    dispatch(getRolesPerPage({ page: active + 1, row, token: user?.token }));
  };

  const prev = () => {
    if (active === 1) return;
    setActive(active - 1);
    dispatch(getRolesPerPage({ page: active - 1, row, token: user?.token }));
  };

  const handlePageChange = (e) => {
    const page = parseInt(e.target.value, 10);
    setActive(page);
    dispatch(getRolesPerPage({ page: active, row, token: user?.token }));
  };

  useEffect(() => {
    dispatch(getPermissions(user?.token));
  }, []);

  const openPopUp = (role) => {
    setIsModalUpdateOpen(true);
    setSelectedRole(role);
  };

  const openAlert = (role) => {
    setIsAlertOpen(true);
    setSelectedRole(role);
  };

  return (
    <>
      {isLoading ? (
        <LoadingSpinner />
      ) : (
        <div className='flex flex-col justify-between h-[100%]'>
          <div>
            <div className='flex justify-end items-center'>
              <Button
                color={'blue'}
                onClick={() => setIsOpen(!isOpen)}
                className='text-sm px-5 py-2 mt-1'
              >
                Ajouter un nouveau rôle
              </Button>
            </div>
            <Modal
              isOpen={isOpen}
              setIsOpen={setIsOpen}
              title={'Nouveau rôle'}
              content={
                <AddRolesForm
                  token={user?.token}
                  row={row}
                  permissions={permissions}
                  setIsOpen={setIsOpen}
                />
              }
            />
            <Modal
              isOpen={isModalUpdateOpen}
              setIsOpen={setIsModalUpdateOpen}
              title={'Update rôle'}
              content={
                <UpdateRoleForm
                  token={user?.token}
                  row={row}
                  permissions={permissions}
                  setIsOpen={setIsModalUpdateOpen}
                  role={selectedRole}
                />
              }
            />
            <Modal
              isOpen={isAlertOpen}
              setIsOpen={setIsAlertOpen}
              title={
                <div className='flex justify-center items-center'>
                  <TbAlertTriangleFilled
                    size='5rem'
                    className='m-3 cursor-pointer text-[#EC907B]'
                  />
                  Voulez-vous vraiment supprimer?
                </div>
              }
              content={
                <Alert
                  token={user?.token}
                  row={row}
                  setIsOpen={setIsAlertOpen}
                  roleId={selectedRole.id}
                  getRolesPerPage={getRolesPerPage}
                  deleteRole={deleteRole}
                />
              }
            />

            <div className='mx-5 mt-10'>
              {roles?.map((role) => (
                <div
                  key={role.id}
                  className='flex flex-col justify-start items-start border-2 my-2 rounded-lg p-3'
                >
                  <div className='w-full flex items-center gap-10'>
                    <div
                      style={{
                        backgroundColor: role.color ? role.color : '#142C45',
                      }}
                      className={`w-3/12 text-sm text-white px-3 py-2 rounded-2xl shadow mt-1`}
                    >
                      {role.name}
                    </div>
                    <HiOutlinePencilSquare
                      fill='#f7c829'
                      size='1.5rem'
                      className='m-3 cursor-pointer'
                      onClick={() => openPopUp(role)}
                    />

                    <MdDeleteForever
                      fill='#EC907B'
                      size='1.5rem'
                      className='m-3 cursor-pointer'
                      onClick={() => openAlert(role)}
                    />
                  </div>
                  <CheckBoxCustom
                    disabled={true}
                    classNameItems={'col'}
                    classNameParent={
                      'w-full grid grid-cols-3 gap-x-10 gap-y-3 my-5 pl-16'
                    }
                    checkboxes={checkboxes}
                    setCheckboxes={setCheckboxes}
                    permissionsByRole={role.permissions}
                    permissions={permissions}
                  />
                </div>
              ))}
            </div>
          </div>
          <div className=''>
            <PaginationNav
              lastPage={lastPage}
              active={active}
              handlePageChange={handlePageChange}
              next={next}
              prev={prev}
            />
          </div>
        </div>
      )}
    </>
  );
};

export default Roles;
