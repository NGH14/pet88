import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Link, NavLink } from 'react-router';

import { ArrowRightOutlined } from '@ant-design/icons';
import { DownOutlined, UserOutlined } from '@ant-design/icons';
import { Button, Dropdown, Menu, Space, Tooltip, message } from 'antd';
import styled from 'styled-components';

import { LoginButton } from './AuthButton.style.mjs';

// import { UserAuth } from '../../context/AuthContext';
import './style.css';

function AuthButton({ TextColor, FullWitdh }) {
	const [collapsed, setCollapsed] = useState(false);

	// const { user, SignOut } = UserAuth();
	const [t] = useTranslation();

	return (
		<section className="authbutton">
			{/* {!user && !localStorage.getItem('name') && ( */}
				<>
					<NavLink to="/sign-in">
						<LoginButton>
							{t('Sign in')} &nbsp;
							<ArrowRightOutlined />
						</LoginButton>
					</NavLink>
				</>
			{/* )} */}
		</section>
	);
}

export default AuthButton;
