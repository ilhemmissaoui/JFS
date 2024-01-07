'use client';

import { reset } from '@/store/features/auth/authSlice';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { toast } from 'react-toastify';

const Dashboard = () => {
  const { user, isError, isAuthorized, isLoading, message, isSuccess } =
    useSelector((state) => state.auth);

  const dispatch = useDispatch();
  const router = useRouter();

  useEffect(() => {
    if (!user) {
      router.push('/connexion');
    }
    if (isError) {
      toast.error(message);
    }
    dispatch(reset());
  }, [user, isError, message]);

  return (
    <>
      <h1>Dashboard</h1>
    </>
  );
};
export default Dashboard;
