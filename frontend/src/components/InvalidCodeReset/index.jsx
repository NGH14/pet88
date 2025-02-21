import React, { useEffect } from 'react';
import { useState } from 'react';
import { NavLink, redirect, useLocation, useNavigate, useResolvedPath } from 'react-router';
import { toast } from 'react-toastify';

import { LockOutlined } from '@ant-design/icons';
import { Button, Checkbox, Form, Input } from 'antd';
import { AnimatePresence, motion } from 'motion/react';

import { UserAuth } from '../../context/AuthContext';
import SignInGoogle from '../SigninGoogle';
import './style.css';

const InValidDisplay = state => {
	const navigate = useNavigate();
	return (
		state && (
			<section className="invalidpage" style={{ textAlign: 'center' }}>
				<h1 className="invalidpage-heading">Reset password link has expired</h1>
				<span className="invalidpage-subtext">
					Your request to reset your password has expired or the link has already been used. Please
					try again!
				</span>
				<Button
					onClick={() => navigate('/forgot-password')}
					type="primary"
					htmlType="submit"
					style={{
						fontWeight: 'bold',
						fontSize: 14,
						lineHeight: 1.8,
						backgroundColor: 'RGB(109, 156, 145)',
						borderColor: 'RGB(109, 156, 145)',
						borderRadius: 50,
						boxShadow: 'rgb(0 0 0 / 25%) 0px 2px 4px 0px',
						marginBottom: 10,
					}}
				>
					BACK TO FORGOT PASSWORD
				</Button>
			</section>
		)
	);
};

export default InValidDisplay;
