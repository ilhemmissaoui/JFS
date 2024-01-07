import { configureStore } from '@reduxjs/toolkit';
import authSlice from './features/auth/authSlice';
import studentSlice from './features/student/studentSlice';
import loaderSlice from './features/loader/loaderSlice';
import roleSlice from './features/role/roleSlice';
import faqSlice from './features/faq/faqSlice';
import memberSlice from './features/member/memberSlice';

// Store Configuration
export const store = configureStore({
  reducer: {
    auth: authSlice,
    student: studentSlice,
    role: roleSlice,
    loader: loaderSlice,
    member: memberSlice,
    faqs: faqSlice,
  },
  devTools: process.env.NODE_ENV !== 'production',
});
