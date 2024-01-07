'use client';

import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import { useForm } from 'react-hook-form';
import InputForm from '../atoms/inputs/InputForm';
import Button from '../atoms/buttons/Button';
import { SketchPicker } from 'react-color';
import { useState } from 'react';
import CheckBox from '../atoms/inputs/CheckBox';
import {
  getMembersPerPage,
  updateMember,
} from '@/store/features/member/memberSlice';
import { useDispatch } from 'react-redux';
import { toast } from 'react-toastify';

const UpdateMemberForm = ({ setIsOpen, permissions, member, row, token }) => {
  const [checkboxes, setCheckboxes] = useState(
    member?.users[0]?.roles[0]?.permissions.map((el) => el.id)
  );
  const dispatch = useDispatch();
  const [color, setColor] = useState(member.color); // Initial color
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues: {
      member: member.name,
    },
    resolver: yupResolver(
      yup.object({
        member: yup.string().max(80),
      })
    ),
    mode: 'all',
  });

  const handleCheckboxChange = (checkboxId) => {
    if (checkboxes.includes(checkboxId)) {
      const newArray = checkboxes.filter((checkbox) => checkbox !== checkboxId);
      setCheckboxes(newArray);
    } else {
      setCheckboxes([...checkboxes, checkboxId]);
    }
  };

  const handleChange = (newColor) => {
    setColor(newColor.hex);
  };
  const onSubmit = (data) => {
    if (checkboxes.length === 0) {
      toast.error('Vous devez choisir une permission');
      return;
    } else {
      dispatch(
        updateMember({
          data: { name: data.member, permission_id: checkboxes, color },
          id: member.id,
          token,
        })
      ).then((res) => {
        if (res) {
          dispatch(getMembersPerPage({ page: 1, row, token }));
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
        id='member'
        error={errors.member}
        type='text'
      />
      <div>
        <div className='my-3'>
          <label className='font-bold font-sans'>Permission</label>
        </div>
        {/* checkbox */}
        <div className='w-full grid grid-cols-3 gap-x-10 gap-y-3 my-5 pl-16'>
          {permissions?.map((permission) => {
            return (
              <CheckBox
                key={permission.id}
                className='col'
                label={permission.name}
                isChecked={checkboxes.includes(permission.id)}
                onChange={() => handleCheckboxChange(permission.id)}
              />
            );
          })}
        </div>
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
        >
          Modifier
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

export default UpdateMemberForm;
