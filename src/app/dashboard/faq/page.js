'use client';
import { getFAQS } from '@/store/features/faq/faqSlice';
import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

const Faq = () => {
  const dispatch = useDispatch();

  const faqs = useSelector((state) => state.faqs.faqs); // Assuming 'faqs' is the slice name in your store
  console.log('faqs', faqs);
  useEffect(() => {
    dispatch(getFAQS());
  }, [dispatch]);
  return (
    <div>
      {faqs ? (
        <div className='grid grid-cols-2 gap-4'>
          {faqs.map((faq) => (
            <div
              key={faq.id}
              className='col-span-3 rounded-lg shadow-md bg-white dark:bg-gray-800 py-6'
            >
              <div className='p-4 flex items-center justify-center'>
                <div>
                  <p className='mb-2 text-sm font-medium text-gray-600 dark:text-gray-400'>
                    {faq.question}
                  </p>
                </div>

                <div>
                  <p className='mb-2 text-sm font-medium text-gray-600 dark:text-gray-400'>
                    {faq.reponse}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      ) : null}
    </div>
  );
};
export default Faq;
