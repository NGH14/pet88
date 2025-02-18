import React from 'react';

export const routes = [
  {
    path: '*',
    element: React.lazy(() => import('pages/NotMatch')),
    private: false,
  },
  {
    path: '/',
    element: React.lazy(() => import('pages/HomePage')),
    private: false,
  },
  {
    path: '/sign-in',
    element: React.lazy(() => import('pages/Login')),
    private: false,
  },
  {
    path: '/sign-up',
    element: React.lazy(() => import('pages/Login')),
    private: false,
  },
  {
    path: '/forgot-password',
    element: React.lazy(() => import('pages/Login')),
    private: false,
  },
  {
    path: '/reset-password',
    element: React.lazy(() => import('pages/ResetPassword')),
    private: false,
  },
  {
    path: '/term-and-condition',
    element: React.lazy(() => import('pages/TermsConditions')),
    private: false,
  },
  {
    path: '/account',
    element: React.lazy(() => import('pages/Account')),
    private: false,
  },
  {
    path: '/admin',
    element: React.lazy(() => import('pages/Admin')),
    private: false,
  },
  {
    path: '/admin/management-user',
    element: React.lazy(() => import('pages/Admin')),
    private: false,
  },
  {
    path: '/admin/management-hotel',
    element: React.lazy(() => import('pages/Admin')),
    private: false,
  },

  {
    path: '/admin/management-promotion',
    element: React.lazy(() => import('pages/Admin')),
    private: false,
  },

  {
    path: '/admin/management-room-category',
    element: React.lazy(() => import('pages/Admin')),
    private: false,
  },
  {
    path: '/admin/management-grooming',
    element: React.lazy(() => import('pages/Admin')),
    private: false,
  },
  {
    path: '/admin/management-order',
    element: React.lazy(() => import('pages/Admin')),
    private: false,
  },

  {
    path: '/confirm/:id',
    element: React.lazy(() => import('pages/BookingConfirm')),
    private: false,
  },
  {
    path: '/booking/success',
    element: React.lazy(() => import('pages/SucessBooking')),
    private: false,
  },

  {
    path: '/search',
    element: React.lazy(() => import('pages/Search')),
    private: false,
  },
  {
    path: '/department/:id',
    element: React.lazy(() => import('pages/Department')),
    private: false,
  },
  {
    path: '/grooming/:id',
    element: React.lazy(() => import('pages/Grooming')),
    private: false,
  },
  {
    path: '/checkout',
    element: React.lazy(() => import('pages/Checkout')),
    private: false,
  },
  {
    path: '/checkout/cancel/:id',
    element: React.lazy(() => import('pages/CancelPayment')),
    private: false,
  },
  {
    path: '/checkout/success/:id',
    element: React.lazy(() => import('pages/SucessPayment')),
    private: false,
  },
  {
    path: '/undercontruction',
    element: React.lazy(() => import('pages/UnderDev')),
    private: false,
  },
];
