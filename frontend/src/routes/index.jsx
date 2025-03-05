/* @vite-ignore */
import { lazy } from 'react';

const routesConfig = [
	{
		path: '*',
		element: 'NotMatch',
		private: false,
	},
	{
		path: '/',
		element: 'HomePage',
		private: false,
	},
	{
		path: '/sign-in',
		element: 'Login',
		private: false,
	},
	{
		path: '/sign-up',
		element: 'Login',
		private: false,
	},
	{
		path: '/forgot-password',
		element: 'Login',
		private: false,
	},
	{
		path: '/reset-password',
		element: 'ResetPassword',
		private: false,
	},
	{
		path: '/term-and-condition',
		element: 'TermsConditions',
		private: false,
	},
	{
		path: '/account',
		element: 'Account',
		private: false,
	},
	{
		path: '/admin',
		element: 'Admin',
		private: false,
	},
	{
		path: '/admin/management-user',
		element: 'Admin',
		private: false,
	},
	{
		path: '/admin/management-hotel',
		element: 'Admin',
		private: false,
	},

	{
		path: '/admin/management-promotion',
		element: 'Admin',
		private: false,
	},

	{
		path: '/admin/management-room-category',
		element: 'Admin',
		private: false,
	},
	{
		path: '/admin/management-grooming',
		element: 'Admin',
		private: false,
	},
	{
		path: '/admin/management-order',
		element: 'Admin',
		private: false,
	},

	{
		path: '/confirm/:id',
		element: 'BookingConfirm',
		private: false,
	},
	{
		path: '/booking/success',
		element: 'SucessBooking',
		private: false,
	},

	{
		path: '/search',
		element: 'Search',
		private: false,
	},
	{
		path: '/department/:id',
		element: 'Department',
		private: false,
	},
	{
		path: '/grooming/:id',
		element: 'Grooming',
		private: false,
	},
	{
		path: '/checkout',
		element: 'Checkout',
		private: false,
	},
	{
		path: '/checkout/cancel/:id',
		element: 'CancelPayment',
		private: false,
	},
	{
		path: '/checkout/success/:id',
		element: 'SucessPayment',
		private: false,
	},
	{
		path: '/undercontruction',
		element: 'UnderDev',
		private: false,
	},
];

const lazyImport = path => lazy(() => import(`@/pages/${path}/index.jsx`));

const routes = routesConfig.map(route => ({
	...route,
	element: lazyImport(route.element),
	private: !!route.private,
}));

export default routes;
