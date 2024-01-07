import Image from 'next/image';
import '../globals.css';

export default function inscriptionLayout({ children }) {
  return (
    <section className='block lg:grid lg:grid-cols-2 h-full'>
      <div className='flex flex-col text-center items-center w-full mt-10'>
        <Image
          src='/imgpsh_fullsize_anim.png'
          alt='inscription image'
          className='mx-auto grow w-[8rem] md:w-auto'
          width={187}
          height={187}
          priority
        />
        <h6 className='md:text-2xl mt-2 font-extrabold text-center font-small font-prompt'>
          Inscription Etablissement
        </h6>
        {children}
      </div>
      <div className='hidden lg:block h-full bg-[#132C45]'>
        <div className='flex h-screen w-full justify-center items-center'>
          <Image
            src='/Image-19.png'
            width={400}
            height={300}
            className='mx-auto w-[20rem]'
            alt='job for student'
          />
        </div>
      </div>
    </section>
  );
}
