import './style.css';

import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';

import LoginForm from '../SignInForm';
import { NavLink, useLocation, useNavigate } from 'react-router';
import SignUpForm from '../SignUpForm';
import ForgotPasswordForm from '../ForgotPasswordForm';
import { UserAuth } from '../../context/AuthContext';
import ChangeLanguage from './../ChangeLanguage';
import { useTranslation } from 'react-i18next';

const LeftSideSignin = ({ src }) => {
	const locate = useLocation();
	const { user } = UserAuth();
	const [t, i18n] = useTranslation();

	return (
		<>
			<section className='loginpage-leftside'>
				<section
					style={{
						display: 'flex',
						alignItems: 'center',
						justifyContent: 'space-between',
						marginInline: 10,
					}}>
					<NavLink to='/'>
						<img src={src} alt='' className='leftside_logo' />
					</NavLink>
					<ChangeLanguage />
				</section>
				<section style={{ width: '100%' }}>
					{(() => {
						switch (locate.pathname) {
							case '/sign-in':
								return <LoginForm />;
							case '/sign-up':
								return <SignUpForm />;
							case '/forgot-password':
								return <ForgotPasswordForm />;
							default:
								return null;
						}
					})()}
				</section>

				<p className='termofuse'>
					{t('By continue using the webiste, you agree to the')}{' '}
					<NavLink
						to='/terms'
						target='_blank'
						rel='noopener noreferrer'>
						{t('Terms of use')}
					</NavLink>
				</p>
			</section>
		</>
	);
};

export default React.memo(LeftSideSignin);
