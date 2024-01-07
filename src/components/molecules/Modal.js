import { Dialog, Transition } from '@headlessui/react';

const Modal = ({ title, content, isOpen, setIsOpen }) => {
  return (
    <Transition appear show={isOpen} as='div'>
      <Dialog
        as='div'
        className='relative z-10'
        onClose={() => setIsOpen(true)}
      >
        <Transition.Child
          as='div'
          enter='ease-out duration-300'
          enterFrom='opacity-0'
          enterTo='opacity-100'
          leave='ease-in duration-200'
          leaveFrom='opacity-100'
          leaveTo='opacity-0'
        >
          <div className='fixed inset-0 bg-black bg-opacity-25' />
        </Transition.Child>

        <div className='fixed inset-0 overflow-y-auto'>
          <div className='flex min-h-full items-center justify-center text-center'>
            <Dialog.Panel className='lg:w-1/2 md:w-4/6 w-4/5 my-10 transform overflow-hidden rounded-2xl bg-white  align-middle shadow-xl transition-all'>
              <div className='bg-[#F8F9FC]'>
                <Dialog.Title
                  as='h3'
                  className='text-center text-lg font-sans leading-6 text-gray-900 Product font-bold p-4'
                >
                  {title ?? title}
                </Dialog.Title>
              </div>
              <div className='pb-6 px-20'>{content ?? content}</div>
            </Dialog.Panel>
          </div>
        </div>
      </Dialog>
    </Transition>
  );
};

export default Modal;
