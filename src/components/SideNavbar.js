'use client';
import React, { useState } from 'react';
import { GiHamburgerMenu } from 'react-icons/gi';
import { CiHeart } from 'react-icons/ci';
import { Disclosure } from '@headlessui/react';
import {
  MdOutlineSpaceDashboard,
  MdOutlineAnalytics,
  MdOutlineSettings,
  MdCalendarToday,
  MdOutlineArticle,
  MdSupervisorAccount,
  MdHandshake,
  MdOutlineCompare,
  MdOutlineCases,
  MdOutlineCheckCircleOutline,
  MdOutlineTextsms,
  MdOutlineEmail,
  MdEmail,
  MdQuestionMark,
  MdOutlineLayers,
  MdOutlineEditNote,
  MdOutlineHistory,
  MdOutlinePermIdentity,
  MdChatBubbleOutline,
} from 'react-icons/md';

import Link from 'next/link';
import Image from 'next/image';

function SideNavbar() {
  return (
    <div>
      <Disclosure as='nav'>
        {/* <Disclosure.Button className="absolute top-4 right-4 inline-flex items-center peer justify-center rounded-md p-2 text-gray-800 hover:bg-gray-900 hover:text-white focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white group">
          <GiHamburgerMenu
            className="block 2-xl:hidden h-6 w-6"
            aria-hidden="true"
          />
        </Disclosure.Button> */}
        <div className=' text-white p-0 lg:p-4 bg-[#132C45] z-20 peer:transition ease-out delay-150 duration-200'>
          <div className='text-sans flex flex-col justify-start item-center '>
            <div className='mx-auto mb-2'>
              <Image
                src='/Image-19.png'
                width={230}
                height={131}
                className='mx-auto w-auto mt-14'
                alt='job for student'
              />
            </div>
            <div className='ml-5'>
              <Link href={'/dashboard/statistic'}>
                <div className='text-xl flex justify-start items-center gap-2 pl-2 hover:bg-white p-4 rounded-md group cursor-pointer hover:shadow-lg'>
                  <MdOutlineSpaceDashboard className=' text-white-600 group-hover:text-[#132C45] hidden xl:block' />
                  <h3 className='text-base text-white-800 group-hover:text-[#132C45] font-normal  '>
                    Tableau de bord
                  </h3>
                </div>
              </Link>
              <Link href={'/dashboard/statistic'}>
                <div className='text-xl flex mb-2 justify-start items-center gap-2 pl-2  p-2 rounded-md group cursor-pointer hover:shadow-lg ml-7'>
                  <MdOutlineAnalytics className=' text-white-600  hidden xl:block' />
                  <h3 className='text-base text-white-800 font-normal xl:p-0 '>
                    Statistiques
                  </h3>
                </div>
              </Link>
              <Link href={'/dashboard/calendar'}>
                <div className='text-xl flex justify-start items-center gap-2 pl-2 hover:bg-white p-4 rounded-md group cursor-pointer hover:shadow-lg ml-7'>
                  <MdCalendarToday className=' text-white-600 group-hover:text-[#132C45] hidden xl:block ' />
                  <h3 className='text-base text-white-800 group-hover:text-[#132C45] font-normal  '>
                    Calendrier
                  </h3>
                </div>
              </Link>
              <Link href={'/dashboard/administrator'}>
                <div className='text-xl flex justify-start items-center gap-2 pl-2 hover:bg-white p-4 rounded-md group cursor-pointer hover:shadow-lg ml-7'>
                  <MdOutlineArticle className=' text-white-600 group-hover:text-[#132C45] hidden xl:block' />
                  <h3 className='text-base text-white-800 group-hover:text-[#132C45] font-normal  '>
                    Administrateur
                  </h3>
                </div>
              </Link>
              <Link href={'/dashboard/etudiants'}>
                <div className='text-xl flex justify-start items-center gap-2 pl-2 hover:bg-white p-4 rounded-md group cursor-pointer hover:shadow-lg'>
                  <MdSupervisorAccount className='text-white-600 group-hover:text-[#132C45] hidden xl:block ' />
                  <h3 className='text-base text-white-800 group-hover:text-[#132C45] font-normal  '>
                    Etudiants
                  </h3>
                </div>
              </Link>
              <Link href={'/dashboard/entreprise'}>
                <div className='text-xl flex justify-start items-center gap-2 pl-2 hover:bg-white p-4 rounded-md group cursor-pointer hover:shadow-lg'>
                  <MdHandshake className='text-white-600 group-hover:text-[#132C45] hidden xl:block' />
                  <h3 className='text-base text-white-800 group-hover:text-[#132C45] font-normal  '>
                    Entreprises
                  </h3>
                </div>
              </Link>
              <Link href={'/dashboard/matchs'}>
                <div className='text-xl flex justify-start items-center gap-2 pl-2 hover:bg-white p-4 rounded-md group cursor-pointer hover:shadow-lg'>
                  <MdOutlineCompare className='text-white-600 group-hover:text-[#132C45] hidden xl:block' />
                  <h3 className='text-base text-white-800 group-hover:text-[#132C45] font-normal  '>
                    Matchs
                  </h3>
                </div>
              </Link>
              <Link href={'/dashboard/oppotunities'}>
                <div className='text-xl flex justify-start items-center gap-2 pl-2 hover:bg-white p-4 rounded-md group cursor-pointer hover:shadow-lg'>
                  <MdOutlineCases className='text-white-600 group-hover:text-[#132C45] hidden xl:block' />
                  <h3 className='text-base text-white-800 group-hover:text-[#132C45] font-normal  '>
                    Opportunités
                  </h3>
                </div>
              </Link>
              <Link href={'/dashboard/todo'}>
                <div className='text-xl flex justify-start items-center gap-2 pl-2 hover:bg-white p-4 rounded-md group cursor-pointer hover:shadow-lg'>
                  <MdOutlineCheckCircleOutline className='text-white-600 group-hover:text-[#132C45] hidden xl:block' />
                  <h3 className='text-base text-white-800 group-hover:text-[#132C45] font-normal  '>
                    To Do
                  </h3>
                </div>
              </Link>
              <Link href={'/dashboard/communication'}>
                <div className='text-xl flex justify-start items-center gap-2 pl-2 hover:bg-white p-4 rounded-md group cursor-pointer hover:shadow-lg'>
                  <MdChatBubbleOutline className='text-white-600 group-hover:text-[#132C45] hidden xl:block' />
                  <h3 className='text-base text-white-800 group-hover:text-[#132C45] font-normal  '>
                    Communication
                  </h3>
                </div>
              </Link>
              <Link href={'/dashboard/communication/reception'}>
                <div className='text-xl flex justify-start items-center gap-2 pl-2 hover:bg-white p-4 rounded-md group cursor-pointer hover:shadow-lg ml-7'>
                  <MdOutlineEmail className='text-white-600 group-hover:text-[#132C45] hidden xl:block' />
                  <h3 className='text-base text-white-800 group-hover:text-[#132C45] font-normal  '>
                    Rèception
                  </h3>
                </div>
              </Link>
              <Link href={'/dashboard/communication/sms'}>
                <div className='text-xl flex justify-start items-center gap-2 pl-2 hover:bg-white p-4 rounded-md group cursor-pointer hover:shadow-lg ml-7'>
                  <MdOutlineTextsms className='text-white-600 group-hover:text-[#132C45] hidden xl:block' />
                  <h3 className='text-base text-white-800 group-hover:text-[#132C45] font-normal  '>
                    Sms
                  </h3>
                </div>
              </Link>
              <Link href={'/dashboard/communication/sms/ecrire'}>
                <div className='text-xl flex justify-start items-center gap-2 pl-2 hover:bg-white p-4 rounded-md group cursor-pointer hover:shadow-lg ml-14'>
                  <MdOutlineEditNote className=' text-white-600 group-hover:text-[#132C45] hidden xl:block' />
                  <h3 className='text-base text-white-800 group-hover:text-[#132C45] font-normal  '>
                    Ecrire
                  </h3>
                </div>
              </Link>
              <Link href={'/dashboard/communication/sms/historique'}>
                <div className='text-xl flex justify-start items-center gap-2 pl-2 hover:bg-white p-4 rounded-md group cursor-pointer hover:shadow-lg ml-14'>
                  <MdOutlineHistory className='text-white-600 group-hover:text-[#132C45] hidden xl:block' />
                  <h3 className='text-base text-white-800 group-hover:text-[#132C45] font-normal  '>
                    Historique d'envoi
                  </h3>
                </div>
              </Link>
              <Link href={'/dashboard/communication/email'}>
                <div className='text-xl flex justify-start items-center gap-2 pl-2 hover:bg-white p-4 rounded-md group cursor-pointer hover:shadow-lg ml-7'>
                  <MdEmail className='text-white-600 group-hover:text-[#132C45] hidden xl:block' />
                  <h3 className='text-base text-white-800 group-hover:text-[#132C45] font-normal  '>
                    Emails
                  </h3>
                </div>
              </Link>
              <Link href={'/dashboard/communication/email/ecrire'}>
                <div className='text-xl flex justify-start items-center gap-2 pl-2 hover:bg-white p-4 rounded-md group cursor-pointer hover:shadow-lg ml-14'>
                  <MdOutlineEditNote className=' text-white-600 group-hover:text-[#132C45] hidden xl:block' />
                  <h3 className='text-base text-white-800 group-hover:text-[#132C45] font-normal  '>
                    Ecrire
                  </h3>
                </div>
              </Link>
              <Link href={'/dashboard/communication/email/historique'}>
                <div className='text-xl flex justify-start items-center gap-2 pl-2 hover:bg-white p-4 rounded-md group cursor-pointer hover:shadow-lg ml-14'>
                  <MdOutlineHistory className='text-white-600 group-hover:text-[#132C45] hidden xl:block' />
                  <h3 className='text-base text-white-800 group-hover:text-[#132C45] font-normal  '>
                    Historique d'envoi
                  </h3>
                </div>
              </Link>
              <Link href={'/dashboard/ressources'}>
                <div className=' text-xl flex justify-start items-center gap-2 pl-2 hover:bg-white p-4 rounded-md group cursor-pointer hover:shadow-lg'>
                  <MdOutlineLayers className='text-white-600 group-hover:text-[#132C45] hidden xl:block' />
                  <h3 className='text-base text-white-800 group-hover:text-[#132C45] font-normal  '>
                    Ressources
                  </h3>
                </div>
              </Link>
              <Link href={'/dashboard/faq'}>
                <div className='text-xl flex justify-start items-center gap-2 pl-2 hover:bg-white p-4 rounded-md group cursor-pointer hover:shadow-lg'>
                  <MdQuestionMark className=' text-white-600 group-hover:text-[#132C45] hidden xl:block' />
                  <h3 className='text-base text-white-800 group-hover:text-[#132C45] font-normal  '>
                    FAQ
                  </h3>
                </div>
              </Link>
              <Link href={'/dashboard/profil'}>
                <div className='text-xl flex justify-start items-center gap-2 pl-2 hover:bg-white p-4 rounded-md group cursor-pointer hover:shadow-lg'>
                  <MdOutlinePermIdentity className='text-white-600 group-hover:text-[#132C45] hidden xl:block' />
                  <h3 className='text-base text-white-800 group-hover:text-[#132C45] font-normal  '>
                    Profil/Vitrine
                  </h3>
                </div>
              </Link>

              {/* setting  */}
              <Link href={'/dashboard/parametres'}>
                <div className='text-xl flex mb-2 justify-start items-center gap-2 pl-2 hover:bg-white p-2 rounded-md group cursor-pointer hover:shadow-lg '>
                  <MdOutlineSettings className='text-white-600 group-hover:text-[#132C45] hidden xl:block' />
                  <h3 className='text-base text-white-800 group-hover:text-[#132C45] font-normal  '>
                    Paramétres
                  </h3>
                </div>
              </Link>
              <div className='flex items-center px-8 mt-20'>
                <p className='text-white font-light text-sm font-sans'>
                  Made with
                </p>
                <div className='inline px-1 '>
                  <CiHeart />
                </div>
                <p className='text-white font-light inline text-sm'>
                  in Toulouse
                </p>
              </div>
            </div>
          </div>
        </div>
      </Disclosure>
    </div>
  );
}

export default SideNavbar;
