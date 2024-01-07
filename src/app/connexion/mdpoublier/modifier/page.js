'use client';

import Link from 'next/link';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { useDispatch, useSelector } from 'react-redux';
import { reset, updatePassword } from '@/store/features/auth/authSlice';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';
import { toast } from 'react-toastify';
import updatePassSchema, {
  updatePassFields,
} from '@/validations/updatePassSchema';
import Spinner from '@/components/Spinner';
import LinearInput from '@/components/atoms/inputs/LinearInput';
import Button from '@/components/atoms/buttons/Button';

const Modifier = () => {
  const {
    register,
    handleSubmit,
    formState: { errors, isDirty },
  } = useForm({
    defaultValues: updatePassFields,
    resolver: yupResolver(updatePassSchema),
    mode: 'all',
  });

  const { isError, isLoading, message, isSuccess } = useSelector(
    (state) => state.auth
  );
  const dispatch = useDispatch();
  const router = useRouter();

  useEffect(() => {
    if (isError) {
      toast.error(message);
    }
    if (message && isSuccess) {
      router.push('/connexion');
      toast.success(message);
    }
    dispatch(reset());
  }, [isError, isSuccess, isLoading, message, dispatch]);

  const onSubmit = (data) => {
    const { password, password_confirmer } = data;
    if (password != password_confirmer) {
      toast.error('Les mot de pass sont differents');
      return;
    }
    dispatch(updatePassword(data));
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
            label='Mot de pass'
            register={register}
            id='password'
            error={errors.password}
            type='password'
            required={true}
          />

          <LinearInput
            label='Valider mot de pass'
            register={register}
            id='password_confirmer'
            error={errors.password_confirmer}
            type='password'
            required={true}
          />

          <Button
            color={'blue'}
            type='submit'
            disabled={!isDirty}
            className='w-full px-4 py-3 rounded-lg shadow mt-10'
          >
            Valider
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

export default Modifier;
