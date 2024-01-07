'use client';
import './globals.css';
import 'react-toastify/dist/ReactToastify.css';
import { Inter } from 'next/font/google';
import { ReduxProvider } from '@/store/provider';
import { ToastContainer } from 'react-toastify';

const inter = Inter({ subsets: ['latin'] });

export default function RootLayout({ children }) {
  return (
    <html lang='en'>
      <body className={inter.className}>
        <ReduxProvider>{children}</ReduxProvider>
        <ToastContainer />
      </body>
    </html>
  );
}
