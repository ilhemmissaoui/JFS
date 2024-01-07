'use client';

import { useDispatch, useSelector } from 'react-redux';
import { RxAvatar } from 'react-icons/rx';
import { GrLogout } from 'react-icons/gr';
import { FaHandsClapping } from 'react-icons/fa6';
import { TbBellRingingFilled } from 'react-icons/tb';
import { useRouter } from 'next/navigation';
import { logout } from '@/store/features/auth/authSlice';
import { toast } from 'react-toastify';
import Button from './atoms/buttons/Button';
import { extractAndUppercase } from '@/utils/customFunctions';
import { useEffect, useState } from 'react';

const TopNavbar = () => {
  const [email, setEmail] = useState('');
  const { user } = useSelector((state) => state.auth);

  const dispatch = useDispatch();
  const router = useRouter();

  const handleClick = (e) => {
    e.preventDefault();
    dispatch(logout());
    router.push('/connexion');
    toast.info('vous êtes déconnecté!');
    localStorage.removeItem('user');
  };
  useEffect(() => {
    setEmail(extractAndUppercase(user?.email));
  }, [user, email]);
  return (
    <div className='flex justify-between items-center w-full px-5 pb-10'>
      <div className='flex justify-between items-center text-[#142C45] text-2xl font-bold'>
        Bonjour <> {email ? email : 'Visiteur'}</>
        <FaHandsClapping size='2rem' className='m-3' fill='#f7c829' />
      </div>
      <div className='flex justify-around'>
        <Button
          color={'blue'}
          className='font-bold  px-16 py-2 mx-6 rounded-xl'
        >
          +To Do
        </Button>
        <TbBellRingingFilled size='1.5rem' className='m-3' />
        <RxAvatar size='1.5rem' className='m-3' />
        <GrLogout
          size='1.5rem'
          onClick={handleClick}
          className='m-3 cursor-pointer'
        />
      </div>
    </div>
  );
};

export default TopNavbar;
