import { memo, useState } from 'react';
import { useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { NavLink, useLocation, useNavigate } from 'react-router';



import { CloseOutlined, LogoutOutlined, MenuOutlined } from '@ant-design/icons';
import { Button, Drawer } from 'antd';
// import { UserAuth } from 'context/AuthContext';
import useScrollPosition from 'hooks/useScrollPosition';
import AuthButton from '~/components/AuthButton/AuthButton.jsx';
import ChangeLanguageButton from '~/components/ChangeLanguageButton/index.jsx';
import { Logo } from '~/components/Logo/Logo.jsx';
import { StyledNavLink } from '~/components/NavLink/index.jsx';



import { NavBarList, StyledNavBar } from './Navbar.style.js';





const pages = [
	{ title: 'About', url: '/#about' },
	{ title: 'Service', url: '/#service' },
];

function Navbar() {
	const locate = useLocation();
	const navigate = useNavigate();

	// const { user, SignOut } = UserAuth();
	const [visible, setVisible] = useState(false);
	const { t, i18n } = useTranslation();

	// const handleSignOut = async e => {
	// 	e.preventDefault();
	// 	try {
	// 		await SignOut();
	// 		navigate('/sign-in');
	// 	} catch (error) {
	// 		console.log(error);
	// 	}
	// };

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
			<StyledNavBar>
				<section className="mobileVisible">
					<Button onClick={showDrawer} type="text" icon={<MenuOutlined />}></Button>
					<Drawer
						footer={<ChangeLanguageButton />}
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
						}}
					>
						<p
							style={{
								transition: 'color 0.3s ease-in-out',

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
									to="about"
									// to={page.url}
									style={{
										transition: 'color 0.3s ease-in-out',
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
						{/* {user && ( */}
						<NavLink
							to="./account"
							style={{
								transition: 'color 0.3s ease-in-out',

								fontWeight: 700,
								fontSize: 16,
								padding: 15,
								borderBottom: '1px solid black',
							}}
						>
							{t('account')}
						</NavLink>
						{/* )} */}

						{/* {user?.role === 'admin' && ( */}
						<NavLink
							to="/admin"
							style={{
								transition: 'color 0.3s ease-in-out',

								fontWeight: 700,
								fontSize: 16,
								padding: 15,
								borderBottom: '1px solid black',
							}}
						>
							{t('Admin Centre')}
						</NavLink>
						{/* )} */}

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
							<Logo src={Logo} />
						</NavLink>
					</section>
				</section>
				<NavBarList className="mobileHidden">
					{pages.map(page => {
						return (
							<StyledNavLink key={page.title} to={page.url}>
								{t(page.title)}
							</StyledNavLink>
						);
					})}
				</NavBarList>

				<section className="mobileHidden">
					<AuthButton />
				</section>
			</StyledNavBar>
		</>
	);
}

export default memo(Navbar);