'use client';
import Image from 'next/image';
import '../globals.css';
import { usePathname } from 'next/navigation';

export default function loginLayout({ children }, props) {
  const pathName = usePathname();

  return (
    <section className='flex flex-col justify-center text-center lg:grid lg:grid-cols-2 h-screen'>
      <div className='flex flex-col justify-center text-center items-center'>
        <Image
          src='/imgpsh_fullsize_anim.png'
          alt='inscription image'
          className='mx-0'
          width={180}
          height={180}
        />
        <h4 className='text-xl text-center font-bold font-prompt ml-2'>
          {pathName == '/connexion'
            ? 'Bienvenue'
            : pathName == '/connexion/mdpoublier'
            ? 'Mot de passe oublié?'
            : 'Réinitialisation de mot de passe'}
        </h4>
        {children}
      </div>
      <div className='hidden lg:grid grid-rows-2 h-screen bg-[#132C45]'>
        <Image
          src='/Capture.jpeg'
          width={700}
          height={100}
          className='bg-black h-screen w-full'
          alt='job for student'
        />
      </div>
    </section>
  );
}
