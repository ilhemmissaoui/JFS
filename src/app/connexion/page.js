'use client';
import Link from 'next/link';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { useDispatch, useSelector } from 'react-redux';
import { loginUser, reset } from '@/store/features/auth/authSlice';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import { toast } from 'react-toastify';
import loginSchema, { loginFields } from '@/validations/loginSchema';
import { loaderOff, loaderOn } from '@/store/features/loader/loaderSlice';
import Spinner from '@/components/Spinner';
import LinearInput from '@/components/atoms/inputs/LinearInput';
import Button from '@/components/atoms/buttons/Button';
import Loader from '@/components/Loader';

const Connexion = () => {
  const {
    register,
    handleSubmit,
    formState: { errors, isDirty },
  } = useForm({
    defaultValues: loginFields,
    resolver: yupResolver(loginSchema),
    mode: 'all',
  });

  const { user, isError, isAuthorized, isLoading, message, isSuccess } =
    useSelector((state) => state.auth);

  const { loaderId } = useSelector((state) => state.loader);

  const [isChecked, setIsChecked] = useState(loginFields.email ? true : false);

  const dispatch = useDispatch();
  const router = useRouter();

  useEffect(() => {
    if (isError) {
      toast.error(message);
    }
    if ((isAuthorized && isSuccess) || user) {
      router.push('/dashboard');
    }
    if (isAuthorized === 0 && message) {
      toast.warning(message);
    }
    if (isAuthorized && message) {
      toast.success(message);
    }

    dispatch(reset());
  }, [user, isError, isAuthorized, isSuccess, isLoading, message, dispatch]);

  const onSubmit = (data) => {
    dispatch(loaderOn());
    dispatch(loginUser({ data, isChecked })).then((res) => {
      if (res) {
        dispatch(loaderOff());
      }
    });
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

          <LinearInput
            label='Mot de passe'
            register={register}
            id='password'
            error={errors.password}
            type='password'
            required={true}
          />
          <div className='flex items-center justify-between mt-5 gap-5'>
            <label className='flex items-center'>
              <input
                type='checkbox'
                className='form-checkbox cursor-pointer'
                checked={isChecked}
                onChange={(e) => setIsChecked(e.target.checked)}
              />
              <span className='ml-2 text-sm font-semibold'>
                Se souvenir de moi
              </span>
            </label>

            <Link
              href='/connexion/mdpoublier'
              className='text-[#132C45] underline text-sm font-semibold'
            >
              Mot de passe oublié ?
            </Link>
          </div>

          <Button
            color={'blue'}
            type='submit'
            disabled={!isDirty}
            className='w-fullpx-4 py-3 rounded-lg shadow mt-10'
          >
            {loaderId ? <Loader /> : 'Connexion'}
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

export default Connexion;
