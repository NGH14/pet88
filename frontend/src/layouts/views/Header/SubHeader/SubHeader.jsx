import React, { useState } from 'react';
import { useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { NavLink, useLocation, useNavigate } from 'react-router';

import { UserOutlined } from '@ant-design/icons';
import { Avatar, Image, Menu, Select } from 'antd';
import ChangeLanguage from 'components/ChangeLanguage/index.jsx';
import { UserAuth } from 'context/AuthContext';

import { StyledSubHeader } from './SubHeader.style.js';

function SubHeader() {
	const locate = useLocation();
	const navigate = useNavigate();
	// const { user, SignOut } = UserAuth();
	const { t, i18n } = useTranslation();
	const [navBg, setNavBg] = useState(false);

	const handleSignOut = async e => {
		e.preventDefault();
		try {
			// await SignOut();
			navigate('/sign-in');
		} catch (error) {
			console.log(error);
		}
	};

	// REMOVE: This is just for testing purposes
	let user = {};
	user.role = 'admin';

	const menu = (
		<Menu
			items={[
				user?.role === 'admin' && {
					key: '3',
					label: <NavLink to={'/admin'}>{t('Admin Centre')}</NavLink>,
				},
				{
					key: '1',
					label: <NavLink to="/account">{t('Account')}</NavLink>,
				},
			]}
		/>
	);
	return (
		<StyledSubHeader>
			<ChangeLanguage />
		</StyledSubHeader>
	);
}

export default SubHeader;
