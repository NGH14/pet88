import React, { useState } from 'react';

import { Drawer, Button } from 'antd';
import Logo from '../../assets/images/Group 1.png';
import LogoWhite from '../../assets/images/Group 3.png';
import { CloseOutlined, MenuOutlined, LogoutOutlined } from '@ant-design/icons';

import AuthButton from './../GoogleAuthButton/';
import { useEffect } from 'react';
import ChangeLanguage from './../ChangeLanguage/';
import useScrollPosition from './../../hooks/useScrollPosition';

import './style.css';
import { NavLink, useLocation, useNavigate } from 'react-router';
import { useTranslation } from 'react-i18next';
import { UserAuth } from 'context/AuthContext';
import {NavBar} from "./navbar.style.js"
import { StyledNavLink } from '../NavLink/NavLink.style.js';

const pages = [
	{ title: 'home', url: '/#top' },
	{ title: 'about', url: '/#about' },
	{ title: 'service', url: '/#service' },
];


function AppHeader() {
	const locate = useLocation();
	const navigate = useNavigate();
	const scrollPosition = useScrollPosition();
	const [navBg, setNavBg] = useState(false);
	const { user, SignOut } = UserAuth();
	const [visible, setVisible] = useState(false);
	const { t, i18n } = useTranslation();

	const handleSignOut = async (e) => {
		e.preventDefault();
		try {
			await SignOut();
			navigate('/sign-in');
		} catch (error) {
			console.log(error);
		}
	};

	const showDrawer = () => {
		document.body.style.overflow = 'hidden';
		setVisible(true);
	};

	const onClose = () => {
		document.body.style.overflow = 'unset';
		setVisible(false);
	};

	return (
		<>
			<NavBar>
				<section className='mobileVisible'>
					<Button
						onClick={showDrawer}
						type='text'
						icon={
							<MenuOutlined
								style={{
									transition: 'color 0.5s ease-in-out',
									color: navBg ? 'black' : 'white',
								}}
							/>
						}
						ghost
					></Button>
					<Drawer
						footer={
							<ChangeLanguage
								fullWidth
								TextColor={visible || navBg ? 'black' : 'white'}
							></ChangeLanguage>
						}
						placement="top"
						width={300}
						className='pet88-menu'
						onClose={onClose}
						closeIcon={<CloseOutlined />}
						open={visible}
						bodyStyle={{
							padding: '0',
							background: 'transparent',
						}}
						headerStyle={{
							border: 'none',
							paddingLeft: 10,
						}}
					>
						<p
							style={{
								transition: 'color 0.3s ease-in-out',

								color: visible || navBg ? 'black' : 'white',
								fontFamily: 'Nunito Sans',
								textTransform: 'uppercase',
								fontWeight: 700,
								fontSize: 16,
								borderTop: '1px solid black',
								margin: 0,
							}}
						>
							{' '}
						</p>

						{pages.map((page, _) => {
							return (
								<NavLink
									key={page.title}
									to='about'
									// to={page.url}
									style={{
										transition: 'color 0.3s ease-in-out',

										color: visible || navBg ? 'black' : 'white',
										fontFamily: 'Nunito Sans',
										textTransform: 'uppercase',
										fontWeight: 700,
										fontSize: 16,
										padding: 15,
										borderBottom: '1px solid black',
									}}
								>
									{t(page.title)}
								</NavLink>
							);
						})}
						{user && (
							<NavLink
								to='./account'
								style={{
									transition: 'color 0.3s ease-in-out',

									color: visible || navBg ? 'black' : 'white',
									fontFamily: 'Nunito Sans',
									textTransform: 'uppercase',
									fontWeight: 700,
									fontSize: 16,
									padding: 15,
									borderBottom: '1px solid black',
								}}
							>
								{t('account')}
							</NavLink>
						)}

						{user?.role === 'admin' && (
							<NavLink
								to='/admin'
								style={{
									transition: 'color 0.3s ease-in-out',

									color: visible || navBg ? 'black' : 'white',
									fontFamily: 'Nunito Sans',
									textTransform: 'uppercase',
									fontWeight: 700,
									fontSize: 16,
									padding: 15,
									borderBottom: '1px solid black',
								}}
							>
								{t('Admin Centre')}
							</NavLink>
						)}

						<section className='drawer-auth'>
							<AuthButton
								TextColor={visible ? 'black' : 'white'}
								FullWitdh={visible ? true : false}
							/>
						</section>
					</Drawer>
				</section>
				<section className='flexleft'>
					<section className='logo'>
						<NavLink to='/'>
							<img
								src={Logo}
								alt=''
								style={{
									maxHeight: 30,
									transition: 'all 0.3s ease-in-out',
								}}
							/>
						</NavLink>
					</section>
				</section>
				<section className='mobileHidden'>
					{pages.map((page) => {
						return (
							<StyledNavLink
								key={page.title}
								to={page.url}
								style={{
									transition: 'color 0.3s ease-in-out',
									textTransform: 'uppercase',
									fontWeight: 700,
									marginInline: 10,
								}}
							>
								{t(page.title)}
							</StyledNavLink>
						);
					})}
				</section>

				<section className='mobileHidden'>
					<AuthButton TextColor={visible || navBg ? 'black' : 'white'} />
				</section>
			</NavBar>
		</>
	);
}

export default AppHeader;
