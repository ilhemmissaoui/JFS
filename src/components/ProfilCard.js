import React, { useState, useEffect, useRef } from 'react';
import Image from 'next/image';
import { FaEnvelope, FaPhone, FaMapMarker } from 'react-icons/fa';
import { BiEnvelope, BiMessageRoundedDots, BiNotepad } from 'react-icons/bi';
import EditStudent from './forms/EditStudent';

function ProfilCard({ student, isSelected, toggleSelection, row }) {
  const [popupOpen, setPopupOpen] = useState(false);
  const popupRef = useRef(null);
  const buttonRef = useRef(null);
  const [modalIsOpen, setModalIsOpen] = useState(false);

  //pop up with 3 options for each ProfilCard...
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        popupRef.current &&
        !popupRef.current.contains(event.target) &&
        buttonRef.current &&
        !buttonRef.current.contains(event.target)
      ) {
        setPopupOpen(false);
      }
    };

    if (popupOpen) {
      document.addEventListener('mousedown', handleClickOutside);
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [popupOpen]);

  //The Edit modal
  const openModal = () => {
    setModalIsOpen(true);
  };
  const closeModal = () => {
    setModalIsOpen(false);
  };

  const togglePopup = () => {
    setPopupOpen(!popupOpen);
  };
  //border color of the ProfilCard depends on the contract type
  let borderColor = 'border-[#00E869]';
  let buttonBgColor = 'bg-[#366D6B]';

  switch (student.contract?.name) {
    case 'stage':
      borderColor = 'border-[3px] border-gradient-to-l border-[#00E869]';
      buttonBgColor = 'bg-[#366D6B]';
      break;
    case 'apprentissage':
      borderColor = 'border-[3px] border-gradient-to-l border-[#FF2F00]';
      buttonBgColor = 'bg-[#EC907B]';
      break;
    case 'professionnalisation':
      borderColor = 'border-[3px] border-gradient-to-l border-[#FFA42D]';
      buttonBgColor = 'bg-[#D39622]';
      break;
    default:
      // Use default colors for other cases
      break;
  }

  return (
    <div
      className={`bg-[#FFFFFF] cursor-pointer m-1 rounded-2xl flex flex-col justify-start items-center max-w-sm h-100 w-64 ${borderColor}`}
    >
      <div>
        <div className='flex justify-between px-4 pt-4'>
          {/* Case à cocher */}
          <div className='self-left mr-2'>
            <input
              type='checkbox'
              id='checkbox'
              className='h-4 w-4'
              checked={isSelected}
              onChange={toggleSelection}
            />
          </div>

          {/* Bouton "trois points" */}
          <button
            id='dropdownButton'
            data-dropdown-toggle='dropdown'
            className='inline-block font-bold dark:text-gray-400 text-center text-gray-500 hover:bg-[#8B98A1] hover:text-white rounded px-4 text-sm py-0.5'
            type='button'
            onClick={togglePopup}
            ref={buttonRef}
          >
            <span className='sr-only'></span>
            <svg
              className='w-5 h-5'
              aria-hidden='true'
              xmlns='http://www.w3.org/2000/svg'
              fill='currentColor'
              viewBox='0 0 16 3'
            >
              <path d='M2 0a1.5 1.5 0 1 1 0 3 1.5 1.5 0 0 1 0-3Zm6.041 0a1.5 1.5 0 1 1 0 3 1.5 1.5 0 0 1 0-3ZM14 0a1.5 1.5 0 1 1 0 3 1.5 1.5 0 0 1 0-3Z' />
            </svg>
          </button>
        </div>

        <div className='flex justify-center items-center px-10'>
          <Image
            width={90}
            height={90}
            src='/avatar.jpg'
            alt='ProfilAvatar'
            className='rounded-full'
          />
        </div>
        <div className='flex justify-center items-center px-10 mt-2'>
          <h1 className='text-xl text-[#132C45] font-bold text-center font-sans'>
            {student.name}&nbsp;
            {student.last_name}
          </h1>
        </div>
        <p className='text-base font-semibold text-center font-sans text-[#111111] px-8'>
          Project design
        </p>
        <div className='flex items-center text-[#ABABAB] gap-4 px-10 py-1 font-medium'>
          <p className='text-xs'>Classe : {student.classe?.name}</p>
          <p className='text-xs'>Promo : {student.promotion?.name}</p>
        </div>
        <div className='flex justify-center items-center mt-2'>
          <button
            className={`text-center px-4 py-1 ${
              buttonBgColor ? buttonBgColor : 'bg-[#366D6B]'
            } text-white focus:ring-opacity-75 rounded-full font-normal text-sm`}
            type='button'
            aria-label='Stage Button'
          >
            {student.contract?.name}
          </button>
        </div>
        <div className='w-60 h-32 contact-container items-center mx-1 my-2 max-w-sm bg-[#F8F9FC] border-2 border-[#D4D4D4] rounded-[10px] pt-2'>
          <div className='contact-item mx-4 my-2 flex items-center space-x-2'>
            <span className='icon'>
              <FaEnvelope />
            </span>
            <p className='contact-info truncate hover:text-clip'>
              {student.email}
            </p>
          </div>
          <div className='contact-item mx-4 my-2 flex items-center space-x-2'>
            <span className='icon'>
              <FaPhone />
            </span>
            <p className='contact-info truncate hover:text-clip'>
              {student.phone}
            </p>
          </div>
          <div className='contact-item mx-4 my-2 flex items-center space-x-2'>
            <span className='icon'>
              <FaMapMarker />
            </span>
            <p className='contact-info truncate hover:text-clip'>
              {student.adress}
            </p>
          </div>
        </div>
        {popupOpen && (
          <div
            className=' text-base'
            style={{
              position: 'absolute',
              top: buttonRef.current.offsetTop + buttonRef.current.clientHeight,
              left: buttonRef.current.offsetLeft,
              zIndex: 10,
            }}
            id='dropdown'
          >
            <div
              className='p-2 max-w-sm mx-auto bg-white rounded-xl shadow-lg flex items-center space-x-4  '
              ref={popupRef}
            >
              <ul className='space-y-2' aria-labelledby='dropdownButton'>
                <li className='' onClick={togglePopup}>
                  <div className='bg-white flex items-center border-2 rounded-2xl px-2 py-1 hover:bg-[#DDDDDD]'>
                    <div className='shrink-0 px-2'>
                      <BiEnvelope />
                    </div>
                    <div>
                      <p className='text mx-1'>Envoyer un mail</p>
                    </div>
                  </div>
                </li>
                <li
                  className='cursor-pointer border-1 my-2'
                  onClick={togglePopup}
                >
                  <div className='bg-white flex items-center border-2 rounded-2xl px-2 py-1 hover:bg-[#DDDDDD]'>
                    <div className='shrink-0 px-2 '>
                      <BiMessageRoundedDots />
                    </div>
                    <div>
                      <p className='text mx-1'>Envoyer un sms</p>
                    </div>
                  </div>
                </li>
                <li className='cursor-pointer' onClick={togglePopup}>
                  <div className=' bg-white flex items-center border-2 rounded-2xl px-2 py-1 hover:bg-[#DDDDDD]'>
                    <div className='shrink-0 px-2'>
                      <BiNotepad />
                    </div>
                    <div>
                      <button className='text mx-1' onClick={openModal}>
                        Modifier la fiche
                      </button>
                    </div>
                  </div>
                </li>
              </ul>
            </div>
          </div>
        )}
      </div>
      {student !== null && (
        <EditStudent
          row={row}
          isOpen={modalIsOpen}
          closeModal={closeModal}
          student={student}
        />
      )}
    </div>
  );
}
export default ProfilCard;
