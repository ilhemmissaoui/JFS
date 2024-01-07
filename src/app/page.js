'use client';
import { reset } from '@/store/features/auth/authSlice';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

const main = () => {
  const { user, isError, message } = useSelector((state) => state.auth);
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
    <Link href={'/dashboard'}>
      <div className='underline inline'>Job-----for-----student </div>
    </Link>
  );
};

export default main;
