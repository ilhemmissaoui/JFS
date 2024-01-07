import { Dialog, Transition } from '@headlessui/react';
import Button from '../atoms/buttons/Button';
import React, { Fragment, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import etudiantSchema from '@/validations/etudiantSchema';
import {
  IsReset,
  editStudent,
  getStudentsPerPage,
} from '@/store/features/student/studentSlice';
import { useDispatch, useSelector } from 'react-redux';
import InputForm from '../atoms/inputs/InputForm';
import SelectForm from '../atoms/selects/SelectForm';
import { toast } from 'react-toastify';
function EditStudent({ isOpen, closeModal, student, row }) {
  const { user } = useSelector((state) => state.auth);
  const { classes, civilities, promotions, contracts, status } = useSelector(
    (state) => state.student
  );
  const initialFormData = {
    civilite: student.civility_id,
    nom: student.name,
    prenom: student.last_name,
    email: student.email,
    telephone: student.phone,
    securite: student.num_security_social,
    adresse: student.adress,
    ville: student.city,
    code: student.zip_code,
    promotion: student.promotion_id,
    classe: student.classe_id,
    status: student.maj_status_id,
    contrat: student.type_contract_id,
  };

  const dispatch = useDispatch();
  const {
    register,
    handleSubmit,
    formState: { errors, isValid },
    reset,
  } = useForm({
    defaultValues: initialFormData, // Use the initial state object
    resolver: yupResolver(etudiantSchema),
    mode: 'all',
  });
  // Input and Select Style of the form
  const InputStyle =
    'px-4 rounded-xl text-left border border-slate-300  h-10  w-full hover:border-[#142C45] focus:border-[#142C45] active:border-[#142C45]';
  const SelectStyle =
    'px-4 rounded-xl text-left border border-slate-300  h-10  w-full hover:border-[#142C45] focus:border-[#142C45] active:border-[#142C4]';

  const onSubmit = async (data) => {
    // Dispatch the asynchronous thunk action
    const modifiedData = {
      civility_id: parseInt(data.civilite),
      name: data.nom,
      last_name: data.prenom,
      email: data.email,
      phone: data.telephone,
      num_security_social: data.securite,
      adress: data.adresse,
      city: data.ville,
      zip_code: data.code,
      promotion_id: parseInt(data.promotion),
      classe_id: parseInt(data.classe),
      maj_status_id: parseInt(data.status),
      type_contract_id: parseInt(data.contrat),
      token: user.token,
    };
    dispatch(
      editStudent({ token: user.token, id: student.id, data: modifiedData })
    ).then((res) => {
      if (res) {
        dispatch(getStudentsPerPage({ token: user.token, page: 1, row }));
        toast.success('Etudiant modifié avec succée');
      }
    });
    closeModal();
  };
  /* // success and Error toast in case of adding a student
  useEffect(() => {
    if (isError) {
      toast.error(message);
    }
    if (isSuccess) {
      console.log('sucess..............', message);
      toast.success(message);
    }
    dispatch(IsReset());
  }, [isError, isSuccess, isLoading, message, dispatch]); */
  if (!isOpen) {
    return null;
  }
  return (
    <div className='modal fixed top-0 left-0 w-full h-full flex justify-center items-center'>
      <Transition appear show={isOpen} as={Fragment}>
        <Dialog as='div' className='relative z-10' onClose={closeModal}>
          <Transition.Child
            as={Fragment}
            enter='ease-out duration-300'
            enterFrom='opacity-0'
            enterTo='opacity-100'
            leave='ease-in duration-200'
            leaveFrom='opacity-100'
            leaveTo='opacity-0'
          >
            <div className='fixed inset-0 bg-black bg-opacity-25' />
          </Transition.Child>

          <div className='fixed inset-0 overflow-y-auto'>
            <div className='flex min-h-full items-center justify-center p-4 text-center'>
              <Transition.Child
                as={Fragment}
                enter='ease-out duration-300'
                enterFrom='opacity-0 scale-95'
                enterTo='opacity-100 scale-100'
                leave='ease-in duration-200'
                leaveFrom='opacity-100 scale-100'
                leaveTo='opacity-0 scale-95'
              >
                <Dialog.Panel className='lg:w-2/5  w-full transform overflow-hidden rounded-2xl bg-white  align-middle shadow-xl transition-all'>
                  <div className=' bg-[#F8F9FC]'>
                    <Dialog.Title
                      as='h3'
                      className='text-center text-lg font-sans leading-6 text-gray-900 Product font-bold p-4'
                    >
                      Fiche administrative étudiant
                    </Dialog.Title>
                  </div>
                  <div className='pb-6 px-20'>
                    <form
                      className='flex flex-col w-full '
                      onSubmit={handleSubmit(onSubmit)}
                      noValidate
                    >
                      <div className='text-left'>
                        <SelectForm
                          className={SelectStyle}
                          LabelStyle='font-bold font-sans'
                          label='Civilité'
                          register={register}
                          id='civilite'
                          error={errors.civilite}
                          options={civilities ?? civilities}
                          required={true}
                        />
                        <InputForm
                          className={InputStyle}
                          LabelStyle='font-bold font-sans'
                          label='Nom'
                          register={register}
                          id='nom'
                          error={errors.nom}
                          type='text'
                          required={true}
                        />
                        <InputForm
                          className={InputStyle}
                          LabelStyle='font-bold font-sans'
                          label='Prénom'
                          register={register}
                          id='prenom'
                          error={errors.prenom}
                          type='text'
                          required={false}
                        />
                        <InputForm
                          className={InputStyle}
                          LabelStyle='font-bold font-sans'
                          label='Email'
                          register={register}
                          id='email'
                          error={errors.email}
                          type='text'
                          required={true}
                        />
                        <InputForm
                          className={InputStyle}
                          LabelStyle='font-bold font-sans'
                          label='Nº de téléphone'
                          register={register}
                          id='telephone'
                          error={errors.telephone}
                          type='text'
                          required={false}
                        />
                        <InputForm
                          className={InputStyle}
                          LabelStyle='font-bold font-sans'
                          label='Nº de sécurité sociale'
                          register={register}
                          id='securite'
                          error={errors.securite}
                          type='text'
                          required={false}
                        />
                        <InputForm
                          className={InputStyle}
                          LabelStyle='font-bold font-sans'
                          label='Complément Adresse'
                          register={register}
                          id='adresse'
                          error={errors.adresse}
                          type='text'
                          required={false}
                        />
                        <InputForm
                          className={InputStyle}
                          LabelStyle='font-bold font-sans'
                          label='Ville'
                          register={register}
                          id='ville'
                          error={errors.ville}
                          type='text'
                          required={false}
                        />
                        <InputForm
                          className={InputStyle}
                          LabelStyle='font-bold font-sans'
                          label='Code postal'
                          register={register}
                          error={errors.code}
                          id='code'
                          type='text'
                          required={true}
                        />
                        <SelectForm
                          className={SelectStyle}
                          label='Promotion'
                          LabelStyle='font-bold font-sans'
                          register={register}
                          id='promotion'
                          error={errors.promotion}
                          options={promotions ?? promotions}
                          required={true}
                        />
                        <SelectForm
                          className={InputStyle}
                          LabelStyle='font-bold font-sans'
                          label='Classe'
                          register={register}
                          id='classe'
                          error={errors.classe}
                          options={classes ?? classes}
                          required={true}
                        />
                        <SelectForm
                          className={InputStyle}
                          LabelStyle='font-bold font-sans'
                          label='Statut'
                          register={register}
                          id='status'
                          error={errors.status}
                          options={status ?? status}
                          required={true}
                        />
                        <SelectForm
                          className={InputStyle}
                          LabelStyle='font-bold font-sans'
                          label='Contrat'
                          register={register}
                          id='contrat'
                          error={errors.contrat}
                          options={contracts ?? contracts}
                          required={true}
                        />
                      </div>
                      <div className='mt-6 items-center '>
                        <Button
                          color={'blue'}
                          className='rounded-xl shadow inline-flex justify-center border border-transparent bg-[#142C45] px-10 py-2 text-sm font-medium text-[#ffffff]  focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2 mx-2'
                          disabled={!isValid}
                        >
                          Modifier
                        </Button>
                        <button
                          className='rounded-xl shadow inline-flex justify-center border border-transparent bg-[#FFFFFF] px-10 py-2 text-sm font-medium text-[#1E1C44]  focus:outline-none focus-visible:ring-2  mx-2'
                          onClick={() => {
                            closeModal();
                            reset();
                          }}
                        >
                          Annuler
                        </button>
                      </div>
                    </form>
                  </div>
                </Dialog.Panel>
              </Transition.Child>
            </div>
          </div>
        </Dialog>
      </Transition>
    </div>
  );
}

export default EditStudent;
