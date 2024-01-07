'use client';

import { useEffect, useState } from 'react';
import { Tab } from '@headlessui/react';
import Roles from '@/components/parametresTabs/Roles';
import { toast } from 'react-toastify';
import { useDispatch, useSelector } from 'react-redux';
import { useRouter } from 'next/navigation';
import Members from '@/components/parametresTabs/Members';
import { reset } from '@/store/features/role/roleSlice';

function classNames(...classes) {
  return classes.filter(Boolean).join(' ');
}

export default function Parameters() {
  const { user } = useSelector((state) => state.auth);
  const { isSuccess, message, isError } = useSelector((state) => state.role);

  const dispatch = useDispatch();
  const router = useRouter();

  useEffect(() => {
    if (!user) {
      router.push('/connexion');
    }
    if (isError) {
      toast.error(message);
    }
    if (isSuccess && message) {
      toast.success(message);
    }
    dispatch(reset());
  }, [user, message]);

  let [tabsNav] = useState([
    { id: 1, label: 'Infos du compte' },
    { id: 2, label: 'Rôles' },
    { id: 3, label: 'Membres' },
    { id: 4, label: 'Facturation' },
    { id: 5, label: 'Alertes' },
    { id: 6, label: 'Base de donnèes' },
  ]);
  return (
    <div className='w-full bg-[#F8F9FC] h-full rounded-xl'>
      <Tab.Group>
        <Tab.List className='pl-10 text-[#132C45] font-bold flex justify-start items-center gap-10 h-[5%]'>
          {tabsNav.map((category) => (
            <Tab
              key={category.id}
              className={({ selected }) =>
                classNames(
                  selected
                    ? 'text-[#132C45] border-b-2 border-[#132C45] outline-none focus:outline-none active:outline-none'
                    : 'text-[#132C45]'
                )
              }
            >
              {category.label}
            </Tab>
          ))}
        </Tab.List>
        <Tab.Panels className='px-3 bg-white rounded-2xl ml-10 mr-14 h-[90%]'>
          <Tab.Panel>Infos du compte</Tab.Panel>
          <Tab.Panel className='h-full'>
            <Roles />
          </Tab.Panel>
          <Tab.Panel>
            <Members />
          </Tab.Panel>
          <Tab.Panel>Facturation</Tab.Panel>
          <Tab.Panel>Alertes</Tab.Panel>
          <Tab.Panel>Base de donnèes</Tab.Panel>
        </Tab.Panels>
      </Tab.Group>
    </div>
  );
}
