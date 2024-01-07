import React from 'react';
import AddStudent from '../forms/AddStudent';
import PercentageCircle from './PercentageCircle';
function Stats() {
  return (
    <div className='grid gap-4 sm:grid-cols-1 md:grid-cols-2 xl:grid-cols-9 my-8'>
      <div className='col-span-2 min-w-0 rounded-lg shadow-xs overflow-hidden bg-[#2F6F71] text-center py-8 px-2'>
        <div className='flex items-center justify-center align-middle'>
          <div className='mx-4'>
            <p className='mb-2 text-sm font-bold text-black text-left'>
              En contrat de stage
            </p>
            <p className='text-2xl font-semibold text-[#132C45] text-left'>
              376
            </p>
          </div>
          <PercentageCircle percentage={80} />
        </div>
      </div>
      <div className='col-span-2 min-w-0 rounded-lg shadow-xs overflow-hidden bg-[#E68F73] py-8 px-2'>
        <div className='flex items-center justify-center align-middle'>
          <div className='mx-4'>
            <p className='mb-2 text-sm font-bold text-black text-left'>
              En contrat d'apprentissage
            </p>
            <p className='text-2xl font-semibold text-[#132C45] text-left'>
              120
            </p>
          </div>
          <PercentageCircle percentage={60} />
        </div>
      </div>
      <div className='col-span-2 min-w-0 rounded-lg shadow-xs overflow-hidden bg-[#D6991D] py-8 px-2'>
        <div className='flex items-center justify-center align-middle'>
          <div className='mx-4'>
            <p className='mb-2 text-sm font-bold text-black text-left'>
              En contrat d'apprentissage
            </p>
            <p className='text-2xl font-semibold text-[#132C45] text-left'>
              120
            </p>
          </div>
          <PercentageCircle percentage={40} />
        </div>
      </div>
      <div className='col-span-3 grid grid-cols-2 divide-x rounded-lg shadow-md bg-white dark:bg-gray-800 w-100 py-6'>
        <div className='p-4 flex items-center justify-center'>
          <div className='p-3 rounded-full text-orange-500 dark:text-orange-100 bg-orange-100 dark:bg-orange-500 mr-4'>
            <svg fill='currentColor' viewBox='0 0 20 20' className='w-8 h-8'>
              <path d='M13 6a3 3 0 11-6 0 3 3 0 016 0zM18 8a2 2 0 11-4 0 2 2 0 014 0zM14 15a4 4 0 00-8 0v3h8v-3zM6 8a2 2 0 11-4 0 2 2 0 014 0zM16 18v-3a5.972 5.972 0 00-.75-2.906A3.005 3.005 0 0119 15v3h-3zM4.75 12.094A5.973 5.973 0 004 15v3H1v-3a3 3 0 013.75-2.906z'></path>
            </svg>
          </div>
          <div>
            <p className='mb-2 text-sm font-medium text-gray-600 dark:text-gray-400'>
              Membres
            </p>
            <p className='text-sm font-semibold text-gray-700 dark:text-gray-200'>
              400
            </p>
          </div>
        </div>
        <div className='flex items-center justify-center'>
          <AddStudent />
        </div>
      </div>
    </div>
  );
}
export default Stats;
