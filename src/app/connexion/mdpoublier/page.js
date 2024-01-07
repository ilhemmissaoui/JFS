'use client';

import Link from 'next/link';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { useDispatch, useSelector } from 'react-redux';
import { forgetPassword, reset } from '@/store/features/auth/authSlice';
import { useEffect } from 'react';
import { toast } from 'react-toastify';
import resetPassSchema, {
  resetPassFields,
} from '@/validations/resetPassSchema';
import LinearInput from '@/components/atoms/inputs/LinearInput';
import Button from '@/components/atoms/buttons/Button';
import Spinner from '@/components/Spinner';

const MdpOublier = () => {
  const {
    register,
    handleSubmit,
    formState: { errors, isDirty },
  } = useForm({
    defaultValues: resetPassFields,
    resolver: yupResolver(resetPassSchema),
    mode: 'all',
  });

  const { isError, isLoading, message, isSuccess } = useSelector(
    (state) => state.auth
  );
  const dispatch = useDispatch();

  useEffect(() => {
    if (isError) {
      toast.error(message);
    }
    if (isSuccess && message) {
      toast.info(message);
    }
    dispatch(reset());
  }, [isError, isSuccess, isLoading, message, dispatch]);

  const onSubmit = (data) => {
    dispatch(forgetPassword(data));
  };

  return (
    <>
      {isLoading ? (
        <Spinner />
      ) : (
        <form
          className='text-left text-sm flex flex-col mt-10 items-left w-[80%] md:w-[55%]'
          onSubmit={handleSubmit(onSubmit)}
          noValidate
        >
          <LinearInput
            label='Email'
            register={register}
            id='email'
            error={errors.email}
            type='email'
            required={true}
          />

          <Button
            color={'blue'}
            type='submit'
            disabled={!isDirty}
            className='w-full px-4 py-3 rounded-lg shadow mt-10'
          >
            Envoyer
          </Button>

          <div className=' text-center text-xs text-[#707070] mt-10 w-full '>
            Nouveau sur Jobforstudent ?
            <Link href={'/inscription'}>
              <div className='underline inline'>S'inscrire</div>
            </Link>
          </div>
        </form>
      )}
    </>
  );
};

export default MdpOublier;
