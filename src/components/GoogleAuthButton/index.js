import { Button, Dropdown, Menu, message, Space, Tooltip } from 'antd';
import React, { useState } from 'react';
import { Link, NavLink } from 'react-router-dom';
import { UserAuth } from '../../context/AuthContext';
import { ArrowRightOutlined } from '@ant-design/icons';
import { DownOutlined, UserOutlined } from '@ant-design/icons';
import './style.css';
import styled from 'styled-components';
import { useTranslation } from 'react-i18next';

const SignUpButton = styled.p`
	font-family: 'Nunito Sans', sans-serif;
	border-radius: 40px;
	background-color: rgb(249 107 24);
	padding: 12px 24px;
	text-align: center;
	color: white;
	font-style: normal;
	font-weight: 700;
	font-size: 14px;
	line-height: 24px;
	letter-spacing: -0.01em;
	border: none;
	margin-bottom: 0;
`;

const SignInButton = styled.a`.
font-family: 'Nunito Sans', sans-serif;
font-weight: 700;
margin-bottom: 0;
&:hover,
&:focus {
  color: red;
}

`;

function AuthButton({ TextColor, FullWitdh }) {
	const [collapsed, setCollapsed] = useState(false);

	const { user, SignOut } = UserAuth();
	const [t] = useTranslation();

	return (
		<div className='authbutton'>
			{!user && !localStorage.getItem('name') && (
				<>
					<NavLink to='/sign-in'>
						<SignInButton
							style={{
								transition: 'color 0.5s ease-in-out',
								color: TextColor,
								fontFamily: 'Nunito Sans',
							}}>
							{t('Sign in')}
						</SignInButton>
					</NavLink>
					<NavLink to='/sign-up'>
						<SignUpButton>
							{t('Sign up')} &nbsp;
							<ArrowRightOutlined />
						</SignUpButton>
					</NavLink>
				</>
			)}
		</div>
	);
}

export default AuthButton;
