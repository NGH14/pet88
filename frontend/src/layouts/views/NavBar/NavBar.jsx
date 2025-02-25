import React, { useState } from 'react';
import { useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { NavLink, useLocation, useNavigate } from 'react-router';

import { CloseOutlined, LogoutOutlined, MenuOutlined } from '@ant-design/icons';
import { Button, Drawer } from 'antd';
import ChangeLanguage from 'components/ChangeLanguage/index.jsx';
import AuthButton from 'components/GoogleAuthButton/';
import { Logo } from 'components/Logo/Logo.jsx';
import { StyledNavLink } from 'components/NavLink/index.jsx';
import { UserAuth } from 'context/AuthContext';
import useScrollPosition from 'hooks/useScrollPosition';

import { StyledNavBar } from './Navbar.style.js';

const pages = [
	{ title: 'About', url: '/#about' },
	{ title: 'Service', url: '/#service' },
];

const SCROLL_THRESHOLD = 100;

function AppHeader() {
	const locate = useLocation();
	const navigate = useNavigate();
	const scrollPosition = useScrollPosition();
	const [navBg, setNavBg] = useState(false);
	const { user, SignOut } = UserAuth();
	const [visible, setVisible] = useState(false);
	const { t, i18n } = useTranslation();
	const isFixed = scrollPosition > SCROLL_THRESHOLD ? true : false;

	const handleSignOut = async e => {
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
			<StyledNavBar isFixed={isFixed}>
				<section className="mobileVisible">
					<Button onClick={showDrawer} type="text" icon={<MenuOutlined />} ghost></Button>
					<Drawer
						footer={<ChangeLanguage />}
						placement="top"
						width={300}
						className="pet88-menu"
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
						}}>
						<p
							style={{
								transition: 'color 0.3s ease-in-out',

								color: visible || navBg ? 'black' : 'white',

								textTransform: 'uppercase',
								fontWeight: 700,
								fontSize: 16,
								borderTop: '1px solid black',
								margin: 0,
							}}>
							{' '}
						</p>

						{pages.map((page, _) => {
							return (
								<NavLink
									key={page.title}
									to="about"
									// to={page.url}
									style={{
										transition: 'color 0.3s ease-in-out',

										color: visible || navBg ? 'black' : 'white',

										textTransform: 'uppercase',
										fontWeight: 700,
										fontSize: 16,
										padding: 15,
										borderBottom: '1px solid black',
									}}>
									{t(page.title)}
								</NavLink>
							);
						})}
						{user && (
							<NavLink
								to="./account"
								style={{
									transition: 'color 0.3s ease-in-out',

									color: visible || navBg ? 'black' : 'white',

									fontWeight: 700,
									fontSize: 16,
									padding: 15,
									borderBottom: '1px solid black',
								}}>
								{t('account')}
							</NavLink>
						)}

						{user?.role === 'admin' && (
							<NavLink
								to="/admin"
								style={{
									transition: 'color 0.3s ease-in-out',

									color: visible || navBg ? 'black' : 'white',

									fontWeight: 700,
									fontSize: 16,
									padding: 15,
									borderBottom: '1px solid black',
								}}>
								{t('Admin Centre')}
							</NavLink>
						)}

						<section className="drawer-auth">
							<AuthButton
								TextColor={visible ? 'black' : 'white'}
								FullWitdh={visible ? true : false}
							/>
						</section>
					</Drawer>
				</section>
				<section>
					<section>
						<NavLink to="/">
							<Logo src={Logo} alt="" dark />
						</NavLink>
					</section>
				</section>
				<section className="mobileHidden">
					{pages.map(page => {
						return (
							<StyledNavLink key={page.title} to={page.url}>
								{t(page.title)}
							</StyledNavLink>
						);
					})}
				</section>

				<section className="mobileHidden">
					<AuthButton />
				</section>
			</StyledNavBar>
		</>
	);
}

export default AppHeader;
