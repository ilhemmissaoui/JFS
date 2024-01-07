import { useEffect, useState } from 'react';
import Button from '../atoms/buttons/Button';
import Modal from '../molecules/Modal';
import AddMembersForm from '../forms/AddMembersForm';
import { useDispatch, useSelector } from 'react-redux';
import LoadingSpinner from '../LoadingSpinner';
import PaginationNav from '../molecules/PaginationNav';
import CheckBoxCustom from '../molecules/CheckBoxCustom';
import { HiOutlinePencilSquare } from 'react-icons/hi2';
import { MdDeleteForever } from 'react-icons/md';
import UpdateMemberForm from '../forms/UpdateMemberForm';
import Alert from '../Alert';
import {
  getMembersPerPage,
  deleteMember,
} from '@/store/features/member/memberSlice';
import {
  getClasses,
  getPromotions,
} from '@/store/features/student/studentSlice';
import {
  getPermissions,
  getRoles,
  getRolesPerPage,
} from '@/store/features/role/roleSlice';

const Members = () => {
  const [checkboxes, setCheckboxes] = useState([]);

  let [isOpen, setIsOpen] = useState(false);
  let [isModalUpdateOpen, setIsModalUpdateOpen] = useState(false);
  let [isAlertOpen, setIsAlertOpen] = useState(false);

  let [selectedMember, setSelectedMember] = useState('');

  const [active, setActive] = useState(1);
  const row = 4;

  useEffect(() => {
    dispatch(getPermissions(user?.token));
    dispatch(getRoles(user?.token));
    dispatch(getClasses(user?.token));
    dispatch(getPromotions(user?.token));
  }, []);

  const { user } = useSelector((state) => state.auth);
  const { allRoles, permissions } = useSelector((state) => state.role);
  const { lastPage, members, isLoading } = useSelector((state) => state.member);
  const { promotions, classes } = useSelector((state) => state.student);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getMembersPerPage({ page: active, row, token: user?.token }));
  }, [dispatch, active]);

  const next = () => {
    if (active === lastPage) return;
    setActive(active + 1);
    dispatch(getMembersPerPage({ page: active + 1, row, token: user?.token }));
  };

  const prev = () => {
    if (active === 1) return;
    setActive(active - 1);
    dispatch(getMembersPerPage({ page: active - 1, row, token: user?.token }));
  };

  const handlePageChange = (e) => {
    const page = parseInt(e.target.value, 10);
    setActive(page);
    dispatch(getMembersPerPage({ page: active, row, token: user?.token }));
  };

  const openPopUp = (member) => {
    setIsModalUpdateOpen(true);
    setSelectedMember(member);
  };

  const openAlert = (member) => {
    setIsAlertOpen(true);
    setSelectedMember(member);
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
                Ajouter un nouveau membre
              </Button>
            </div>
            <Modal
              isOpen={isOpen}
              setIsOpen={setIsOpen}
              title={'Nouveau rôle'}
              content={
                <AddMembersForm
                  token={user?.token}
                  row={row}
                  roleOptions={allRoles}
                  classOptions={classes}
                  promoOptions={promotions}
                  setIsOpen={setIsOpen}
                />
              }
            />
            {/* <Modal
              isOpen={isModalUpdateOpen}
              setIsOpen={setIsModalUpdateOpen}
              title={'Update rôle'}
              content={
                <UpdateMemberForm
                  token={user?.token}
                  row={row}
                  permissions={permissions}
                  setIsOpen={setIsModalUpdateOpen}
                  member={selectedMember}
                />
              }
            />
              <Modal
              isOpen={isAlertOpen}
              setIsOpen={setIsAlertOpen}
              title={'Alert'}
              content={
                <Alert
                  token={user?.token}
                  row={row}
                  setIsOpen={setIsAlertOpen}
                  memberId={selectedMember.id}
                  getMembersPerPage={getMembersPerPage}
                  deleteMember={deleteMember}
                />
              }
            /> */}

            <div className='mx-5 mt-10'>
              {members?.map((member) => (
                <div
                  key={member.id}
                  className='flex flex-col justify-start items-start border-2 my-2 rounded-lg p-3'
                >
                  <div className='w-full flex justify-between items-center'>
                    <div
                      style={{
                        backgroundColor: member.color
                          ? member.color
                          : '#142C45',
                      }}
                      className={`w-10 h-10 rounded-full 
                      inline-flex items-center justify-center`}
                    ></div>
                    <p className='font-bold mx-2'> {member?.name} </p>
                    <HiOutlinePencilSquare
                      fill='#f7c829'
                      size='1.5rem'
                      className='cursor-pointer'
                      onClick={() => openPopUp(member)}
                    />

                    <MdDeleteForever
                      fill='#EC907B'
                      size='1.5rem'
                      className='cursor-pointer'
                      onClick={() => openAlert(member)}
                    />
                    <div
                      className={`w-3/12 text-sm px-3 p-1 border-2 rounded-xl mt-1`}
                    >
                      {member.email}
                    </div>
                    <div
                      style={{
                        backgroundColor: member.color
                          ? member.color
                          : '#142C45',
                      }}
                      className={`w-3/12 text-sm text-white px-3 py-2 rounded-2xl shadow mt-1`}
                    >
                      {member?.users[0]?.roles[0]?.name}
                    </div>
                  </div>
                  <CheckBoxCustom
                    disabled={true}
                    classNameItems={'col'}
                    classNameParent={
                      'w-full grid grid-cols-3 gap-x-10 gap-y-3 my-5 pl-16'
                    }
                    checkboxes={checkboxes}
                    setCheckboxes={setCheckboxes}
                    permissionsByRole={
                      member?.users[0]?.roles[0]?.permissions
                        ? member?.users[0]?.roles[0]?.permissions
                        : []
                    }
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

export default Members;
