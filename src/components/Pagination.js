import React, { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { Typography } from '@material-tailwind/react';
import { ArrowRightIcon, ArrowLeftIcon } from '@heroicons/react/24/outline';
import { getStudentsPerPage } from '@/store/features/student/studentSlice';
function Pagination({ lastPage }) {
  const [active, setActive] = useState(1);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getStudentsPerPage(active));
  }, [dispatch, active]);

  const next = () => {
    if (active === lastPage) return;
    setActive(active + 1);
    dispatch(getStudentsPerPage(active + 1));
  };

  const prev = () => {
    if (active === 1) return;
    setActive(active - 1);
    dispatch(getStudentsPerPage(active - 1));
  };

  const handlePageChange = (e) => {
    const page = parseInt(e.target.value, 10);
    setActive(page);
    dispatch(getStudentsPerPage(page));
  };
  const isPrevButtonDisabled = active === 1;
  const isNextButtonDisabled = active === lastPage;

  return (
    <div className='mx-10 px-4 py-4 flex justify-between'>
      <Typography color='gray' className='font-normal'>
        <strong className='text-gray-400'>{active}</strong> -{' '}
        <strong className='text-gray-400 '>{lastPage}</strong> de{' '}
        <strong className='text-gray-400'> 12 </strong>
      </Typography>

      <div className='flex gap-2 divide-x-2'>
        <select
          value={active}
          onChange={handlePageChange}
          className='rounded-lg border-2 border-grey py-1 text-gray-500'
        >
          {Array.from({ length: lastPage }, (_, index) => index + 1).map(
            (pageNumber) => (
              <option key={pageNumber} value={pageNumber}>
                {pageNumber}
              </option>
            )
          )}
        </select>
        <div className='flex gap-2'>
          <button
            disabled={isPrevButtonDisabled}
            onClick={prev}
            className={`rounded-lg border-2 border-grey px-2 ml-2 ${
              isPrevButtonDisabled
                ? 'text-gray-300 cursor-not-allowed'
                : 'hover:bg-gray-100'
            }`}
          >
            <ArrowLeftIcon
              strokeWidth={2}
              className={`h-3 w-3 ${
                isPrevButtonDisabled ? 'text-gray-400' : 'text-black'
              }`}
            />
          </button>
          <button
            disabled={isNextButtonDisabled}
            onClick={next}
            className={`rounded-lg border-2 border-grey px-2 ${
              isNextButtonDisabled
                ? 'text-gray-300 cursor-not-allowed'
                : 'hover:bg-gray-100'
            }`}
          >
            <ArrowRightIcon
              strokeWidth={2}
              className={`h-3 w-3 ${
                isNextButtonDisabled ? 'text-gray-400' : 'text-black'
              }`}
            />
          </button>
        </div>
      </div>
    </div>
  );
}

export default Pagination;
