'use client';
import { yupResolver } from '@hookform/resolvers/yup';
import { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { useDispatch, useSelector } from 'react-redux';
import Button from '@/components/atoms/buttons/Button';
import { useRouter } from 'next/navigation';
import {
  getOptions,
  registerUser,
  reset,
} from '@/store/features/auth/authSlice';
import { toast } from 'react-toastify';
import inscriptionSchema, {
  inscriptionFields,
} from '@/validations/inscriptionSchema';
import Link from 'next/link';
import { loaderOff, loaderOn } from '@/store/features/loader/loaderSlice';
import Spinner from '@/components/Spinner';
import InputForm from '@/components/atoms/inputs/InputForm';
import SelectForm from '@/components/atoms/selects/SelectForm';
import Loader from '@/components/Loader';

const Inscription = () => {
  const { user, isError, isSuccess, isLoading, message, options } = useSelector(
    (state) => state.auth
  );
  const { loaderId } = useSelector((state) => state.loader);

  const dispatch = useDispatch();
  const router = useRouter();

  useEffect(() => {
    dispatch(getOptions());
    localStorage.removeItem('user');
  }, []);
  {
  }
  useEffect(() => {
    if (isSuccess && message) {
      router.push('/connexion');
    }
    if (isError) {
      toast.error(message);
    }
    if (message) {
      toast.success(message);
    }
    dispatch(reset());
  }, [user, isError, isSuccess, isLoading, message, dispatch]);

  const onSubmit = (data) => {
    dispatch(loaderOn());
    dispatch(registerUser(data)).then((res) => {
      if (res) {
        dispatch(loaderOff());
      }
    });
  };

  const {
    register,
    handleSubmit,
    formState: { errors, isDirty },
  } = useForm({
    defaultValues: inscriptionFields,
    resolver: yupResolver(inscriptionSchema),
    mode: 'all',
  });

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
          <InputForm
            label="Nom de l'établissement"
            id='name'
            register={register}
            error={errors.name}
            type='text'
            required={true}
          />
          <InputForm
            label='Email'
            register={register}
            id='email'
            error={errors.email}
            type='email'
            required={true}
          />
          <InputForm
            label='Mot de passe'
            register={register}
            id='password'
            error={errors.password}
            type='password'
            required={true}
          />
          <SelectForm
            label='Statut'
            register={register}
            id='status'
            error={errors.status}
            options={options ?? options}
            required={true}
          />
          <InputForm
            label='Dénomination du CFA responsable'
            register={register}
            id='cfa_responsable'
            error={errors.cfa_responsable}
            type='text'
            required={true}
          />
          {/* Other fields */}
          <SelectForm
            label="CFA d'entreprise"
            register={register}
            id='cfa_entreprise'
            error={errors.cfa_entreprise}
            options={[
              { name: 'Oui', id: 1, uuid: 1 },
              { name: 'Non', id: 2, uuid: 2 },
            ]}
            required={true}
          />

          <InputForm
            label='Commune'
            register={register}
            id='commune'
            error={errors.commune}
            type='text'
            required={true}
          />
          <InputForm
            label='N°UAI du CFA'
            register={register}
            id='cfa'
            error={errors.cfa}
            type='text'
            required={true}
          />
          <InputForm
            label='SIRET CFA'
            register={register}
            id='siret'
            error={errors.siret}
            type='text'
            required={true}
          />
          <InputForm
            label='Adresse du CFA responsable'
            register={register}
            id='adresse_cfa_responsable'
            error={errors.adresse_cfa_responsable}
            type='text'
            required={true}
          />
          <InputForm
            label='Code postal'
            register={register}
            id='zip_code'
            error={errors.zip_code}
            type='text'
            required={true}
          />
          <div className='flex flex-col justify-center items-center'>
            <Button
              color={'red'}
              className='mx-auto px-4 py-2 mt-8 mb-3 w-40'
              type='submit'
              disabled={!isDirty}
            >
              {loaderId ? <Loader /> : 'Valider'}
            </Button>
            <div className=' text-center md:text-lg text-[#707070] w-full mb-10'>
              Déjà membre ?{' '}
              <Link href={'/connexion'}>
                <div className='underline inline text-[#132C45] font-bold'>
                  connectez-vous
                </div>
              </Link>
            </div>
          </div>
        </form>
      )}
    </>
  );
};

export default Inscription;
