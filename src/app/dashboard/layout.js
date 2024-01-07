import '../globals.css';
import SideNavbar from '@/components/SideNavbar';
import TopNavbar from '@/components/TopNavbar';

export default function dashboardLayout({ children }) {
  return (
    <main>
      <div className='grid grid-cols-5'>
        <div className='hidden md:block'>
          <SideNavbar />
        </div>
        <div className='col-span-4 flex flex-col w-full p-11 h-full'>
          <TopNavbar />
          <div className='h-full'>{children}</div>
        </div>
      </div>
    </main>
  );
}
