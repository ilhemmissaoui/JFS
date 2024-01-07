'use client';

import { yupResolver } from '@hookform/resolvers/yup';
import { useForm } from 'react-hook-form';
import InputForm from '../atoms/inputs/InputForm';
import Button from '../atoms/buttons/Button';
import { SketchPicker } from 'react-color';
import { useState } from 'react';
import { toast } from 'react-toastify';
import { useDispatch } from 'react-redux';
import membreSchema, { membreFields } from '@/validations/memberSchema';
import SelectForm from '../atoms/selects/SelectForm';
import SelectMulti from '../atoms/selects/SelectMulti';
import {
  addMember,
  getMembersPerPage,
} from '@/store/features/member/memberSlice';

const AddMembersForm = ({
  setIsOpen,
  roleOptions,
  classOptions,
  promoOptions,
  row,
  token,
}) => {
  const [color, setColor] = useState('#BE5454'); // Initial color
  const [classe, setClasse] = useState('');
  const [promotion_id, setPromotion_id] = useState('');

  const dispatch = useDispatch();
  const {
    register,
    handleSubmit,
    formState: { errors, isDirty },
  } = useForm({
    defaultValues: membreFields,
    resolver: yupResolver(membreSchema),
    mode: 'all',
  });

  const handleChange = (newColor) => {
    setColor(newColor.hex);
  };

  const onSubmit = (data) => {
    data.color = color;
    data.classe_id = classe.map((el) => el.value);
    data.promotion_id = promotion_id.map((el) => el.value);
    dispatch(addMember({ data, token })).then((res) => {
      if (res) {
        dispatch(getMembersPerPage({ page: 1, row, token }));
      }
    });
    setIsOpen(false);
  };

  return (
    <form
      className='text-left flex flex-col mt-10 items-left'
      onSubmit={handleSubmit(onSubmit)}
      noValidate
    >
      <InputForm
        LabelStyle='font-bold font-sans'
        label='Nom'
        register={register}
        id='name'
        error={errors.name}
        type='text'
        required={true}
      />
      <InputForm
        LabelStyle='font-bold font-sans'
        label='Prénom'
        register={register}
        id='last_name'
        error={errors.last_name}
        type='text'
        required={true}
      />
      <SelectForm
        LabelStyle='font-bold font-sans'
        label='Choix de rôle'
        register={register}
        id='role'
        error={errors.role}
        options={roleOptions ?? roleOptions}
        required={true}
      />
      <SelectMulti
        LabelStyle='font-bold font-sans'
        label='Classe'
        onChange={(e) => setClasse(e)}
        value={classe}
        id='classe_id'
        options={classOptions ?? classOptions}
      />
      <SelectMulti
        LabelStyle='font-bold font-sans'
        label='Promo'
        value={promotion_id}
        onChange={(e) => setPromotion_id(e)}
        id='promotion_id'
        options={promoOptions ?? promoOptions}
      />
      <InputForm
        LabelStyle='font-bold font-sans'
        label='Email'
        register={register}
        id='email'
        error={errors.email}
        type='text'
        required={true}
      />
      <InputForm
        LabelStyle='font-bold font-sans'
        label='Numéro de portable'
        register={register}
        id='phone_number'
        error={errors.phone_number}
        type='text'
      />

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

export default AddMembersForm;
