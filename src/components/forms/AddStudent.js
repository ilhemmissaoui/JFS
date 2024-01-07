import { Dialog, Transition } from '@headlessui/react';
import { Fragment, useState, useEffect } from 'react';
import InputForm from '../atoms/inputs/InputForm';
import Button from '../atoms/buttons/Button';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import etudiantSchema, { etudiantFields } from '@/validations/etudiantSchema';
import { useDispatch, useSelector } from 'react-redux';
import {
  IsReset,
  getStatus,
  getContracts,
  getClasses,
  getPromotions,
  getCivilite,
  getStudentsPerPage,
  addStudents,
} from '@/store/features/student/studentSlice';
import SelectForm from '../atoms/selects/SelectForm';
import { toast } from 'react-toastify';
export default function AddStudent() {
  const { user } = useSelector((state) => state.auth);
  const row = 8;
  // Input style
  const InputStyle =
    'px-4 rounded-xl text-left border border-slate-300  h-10  w-full hover:border-[#142C45] focus:border-[#142C45] active:border-[#142C45]';
  const SelectStyle =
    'px-4 rounded-xl text-left border border-slate-300  h-10  w-full hover:border-[#142C45] focus:border-[#142C45] active:border-[#142C4]';
  const dispatch = useDispatch();

  // Use an object to keep track of loading states for each action
  const [loadingStates, setLoadingStates] = useState({
    civilite: false,
    classes: false,
    promotions: false,
    contracts: false,
    status: false,
  });

  // Use the useSelector hook to get data from the Redux store
  const {
    classes,
    civilities,
    promotions,
    contracts,
    status,
    isError,
    isLoading,
    isSuccess,
    message,
  } = useSelector((state) => state.student);
  // Define an effect to fetch data for multiple actions
  useEffect(() => {
    const fetchData = async () => {
      try {
        // Dispatch actions and update loading states accordingly
        setLoadingStates({
          civilite: true,
          classes: true,
          promotions: true,
          contracts: true,
          status: true,
        });

        await Promise.all([
          dispatch(getCivilite()),
          dispatch(getClasses()),
          dispatch(getPromotions()),
          dispatch(getContracts()),
          dispatch(getStatus()),
        ]);

        // Update loading states to indicate that data has been loaded
        setLoadingStates({
          civilite: false,
          classes: false,
          promotions: false,
          contracts: false,
          status: false,
        });
      } catch (error) {
        console.error('Error fetching data:', error);
        // Handle errors here if needed
      }
    };

    // Fetch data when the component mounts
    fetchData();
  }, [dispatch]);

  let [isOpen, setIsOpen] = useState(false);
  const {
    register,
    handleSubmit,
    formState: { errors, isValid },
    reset,
  } = useForm({
    defaultValues: etudiantFields,
    resolver: yupResolver(etudiantSchema),
    mode: 'all',
  });
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
    dispatch(addStudents({ token: user.token, data: modifiedData })).then(
      (res) => {
        if (res) {
          toast.success('Etudiant ajouté avec succée');
          dispatch(getStudentsPerPage({ token: user.token, page: 1, row }));
        }
      }
    );
    setIsOpen(false);
  };
  function closeModal() {
    setIsOpen(false);
  }

  function openModal() {
    setIsOpen(true);
  }
  return (
    <>
      <div>
        <Button
          color={'blue'}
          type='button'
          onClick={openModal}
          className='w-70 bg-[#142C45] text-sm font-medium text-white px-4 py-3 rounded-xl shadow'
        >
          + Ajouter un étudiant
        </Button>
      </div>
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
                      Nouvel étudiant
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
                          //disabled={!isValid}
                        >
                          Ajouter
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
    </>
  );
}
