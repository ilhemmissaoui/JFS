'use client';

import roleSchema, { roleFields } from '@/validations/roleSchema';
import { yupResolver } from '@hookform/resolvers/yup';
import { useForm } from 'react-hook-form';
import InputForm from '../atoms/inputs/InputForm';
import Button from '../atoms/buttons/Button';
import CheckBoxGroup from '../molecules/CheckBoxGroup';
import { SketchPicker } from 'react-color';
import { useState } from 'react';
import { toast } from 'react-toastify';
import { useDispatch } from 'react-redux';
import { addRole, getRolesPerPage } from '@/store/features/role/roleSlice';

const AddRolesForm = ({ setIsOpen, permissions, row, token }) => {
  const [checkboxes, setCheckboxes] = useState([]);
  const [color, setColor] = useState('#BE5454'); // Initial color

  const dispatch = useDispatch();
  const {
    register,
    handleSubmit,
    formState: { errors, isDirty },
  } = useForm({
    defaultValues: roleFields,
    resolver: yupResolver(roleSchema),
    mode: 'all',
  });

  const handleChange = (newColor) => {
    setColor(newColor.hex);
  };

  const onSubmit = (data) => {
    if (checkboxes.length === 0) {
      toast.error('Vous devez choisir une permission');
      return;
    } else {
      dispatch(
        addRole({ name: data.role, permission_id: checkboxes, color, token })
      ).then((res) => {
        if (res) {
          dispatch(getRolesPerPage({ page: 1, row, token }));
        }
      });
      setIsOpen(false);
    }
  };

  return (
    <form
      className='text-left flex flex-col mt-10 items-left'
      onSubmit={handleSubmit(onSubmit)}
      noValidate
    >
      <InputForm
        LabelStyle='font-bold font-sans'
        label='Rôle'
        register={register}
        id='role'
        error={errors.role}
        type='text'
        required={true}
      />
      <div>
        <div className='my-3'>
          <label className='font-bold font-sans'>Permission</label>
          <span className='text-red-600 text-xl'>&nbsp;*</span>
        </div>
        <CheckBoxGroup
          classNameItems={'col'}
          classNameParent={
            'w-full grid grid-cols-3 gap-x-10 gap-y-3 my-5 pl-16'
          }
          permissions={permissions}
          checkboxes={checkboxes}
          setCheckboxes={setCheckboxes}
        />
      </div>
      <div className='font-bold font-sans mt-3'>Ajout code couleur</div>
      <p className='text-[#707070] text-sm mt-2 mb-5'>
        Ce code couleur est utilisé à titre distinctif sur les vues agenda...
      </p>
      <SketchPicker color={color} onChange={handleChange} />
      <div className='flex justify-center items-center gap-20 mt-10'>
        <Button
          className='px-4 py-2 mt-8 mb-10 w-40'
          type='submit'
          color={'blue'}
          disabled={!isDirty}
        >
          Ajouter
        </Button>
        <Button
          type='button'
          onClick={() => setIsOpen(false)}
          className='px-4 py-2 mt-8 mb-10 w-40'
        >
          Annuler
        </Button>
      </div>
    </form>
  );
};

export default AddRolesForm;
