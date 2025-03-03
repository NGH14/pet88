import {lazy} from 'react';

export const routes = [
	{
		path: '*',
		element: lazy(() => import('pages/NotMatch')),
		private: false,
	},
	{
		path: '/',
		element: lazy(() => import('pages/HomePage')),
		private: false,
	},
	{
		path: '/sign-in',
		element: lazy(() => import('pages/Login')),
		private: false,
	},
	{
		path: '/sign-up',
		element: lazy(() => import('pages/Login')),
		private: false,
	},
	{
		path: '/forgot-password',
		element: lazy(() => import('pages/Login')),
		private: false,
	},
	{
		path: '/reset-password',
		element: lazy(() => import('pages/ResetPassword')),
		private: false,
	},
	{
		path: '/term-and-condition',
		element: lazy(() => import('pages/TermsConditions')),
		private: false,
	},
	{
		path: '/account',
		element: lazy(() => import('pages/Account')),
		private: false,
	},
	{
		path: '/admin',
		element: lazy(() => import('pages/Admin')),
		private: false,
	},
	{
		path: '/admin/management-user',
		element: lazy(() => import('pages/Admin')),
		private: false,
	},
	{
		path: '/admin/management-hotel',
		element: lazy(() => import('pages/Admin')),
		private: false,
	},

	{
		path: '/admin/management-promotion',
		element: lazy(() => import('pages/Admin')),
		private: false,
	},

	{
		path: '/admin/management-room-category',
		element: lazy(() => import('pages/Admin')),
		private: false,
	},
	{
		path: '/admin/management-grooming',
		element: lazy(() => import('pages/Admin')),
		private: false,
	},
	{
		path: '/admin/management-order',
		element: lazy(() => import('pages/Admin')),
		private: false,
	},

	{
		path: '/confirm/:id',
		element: lazy(() => import('pages/BookingConfirm')),
		private: false,
	},
	{
		path: '/booking/success',
		element: lazy(() => import('pages/SucessBooking')),
		private: false,
	},

	{
		path: '/search',
		element: lazy(() => import('pages/Search')),
		private: false,
	},
	{
		path: '/department/:id',
		element: lazy(() => import('pages/Department')),
		private: false,
	},
	{
		path: '/grooming/:id',
		element: lazy(() => import('pages/Grooming')),
		private: false,
	},
	{
		path: '/checkout',
		element: lazy(() => import('pages/Checkout')),
		private: false,
	},
	{
		path: '/checkout/cancel/:id',
		element: lazy(() => import('pages/CancelPayment')),
		private: false,
	},
	{
		path: '/checkout/success/:id',
		element: lazy(() => import('pages/SucessPayment')),
		private: false,
	},
	{
		path: '/undercontruction',
		element: lazy(() => import('pages/UnderDev')),
		private: false,
	},
];
