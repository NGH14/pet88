import React from 'react';
import { useState } from 'react';
import { useEffect } from 'react';
import { GoogleButton } from 'react-google-button';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router';
import { toast } from 'react-toastify';

import { LoadingOutlined } from '@ant-design/icons';
import { Spin } from 'antd';

// import { UserAuth } from '../../context/AuthContext';

const antIcon = (
	<LoadingOutlined
		style={{
			fontSize: 20,
			color: '#F76A1A',
		}}
		spin
	/>
);
export default function SignInGoogle({ ...props }) {
	// const { googleSignIn, AddUserToDB, user } = UserAuth();
	const [loading, setLoading] = useState(false);
	const { t, i18n } = useTranslation();
	const handleGoogleSignIn = async () => {
		setLoading(true);
		try {
			// const { user } = await googleSignIn();
			// await AddUserToDB(user, {});
		} catch (error) {
			toast.error(t('Fail to login in Google'));
			setLoading(false);
			console.log(error);
		}
	};

	return (
		<Spin spinning={loading} indicator={antIcon}>
			<GoogleButton {...props} onClick={() => handleGoogleSignIn()} />
		</Spin>
	);
}
