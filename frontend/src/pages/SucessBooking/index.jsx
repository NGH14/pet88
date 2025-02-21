import React, { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { BsCheck2Circle } from 'react-icons/bs';
import { useLocation, useNavigate } from 'react-router';

import {
	Breadcrumb,
	Button,
	Card,
	ConfigProvider,
	DatePicker,
	Form,
	Input,
	Layout,
	Select,
	Skeleton,
	Space,
	Steps,
	Table,
	sectionider,
} from 'antd';
import viVN from 'antd/es/locale/vi_VN';
import logo from 'assets/images/BlackLogo.png';
import axios from 'axios';

import SubNavBar from 'components/views/SubHeader/SubHeader.jsx';

import FooterWave from '../../components/Footer/Footer.jsx';
import AppHeader from '../../components/Navbar';
import { SearchData } from '../../context/SearchContext';
import './style.css';

const { Step } = Steps;
const { Header, Content, Footer } = Layout;

export default function PaymentSuccess() {
	const { t, i18n } = useTranslation();
	const navigate = useNavigate();

	const handleClick = () => {
		navigate('/', { replace: true });
	};
	return (
		<ConfigProvider locale={i18n.language === 'vi_VN' && viVN}>
			<Layout className="departhtLayout">
				<Header>
					<SubNavBar></SubNavBar>
					<AppHeader></AppHeader>
				</Header>
				<Content>
					<section className="success_payment-page">
						<section className="checkoutpage_step">
							<Steps current={3} size="small">
								<Step title={t('Your Selection')} description={t('Finish')} />
								<Step title={t('Your Details')} description={t('Finish')} />
								<Step title={t('Your Booking')} description={t('Finish')} />
							</Steps>
						</section>

						<section className="payment_status-page">
							<BsCheck2Circle
								color="#4BB543"
								style={{
									fontSize: 100,
									marginBottom: 30,
								}}
							></BsCheck2Circle>
							<h1 style={{ fontWeight: 700 }}> {t('Booking Successful')}</h1>
							<span className="forgotpassword-subtext">
								{t('A Verification email has been sent to your email address')}
								<br /> <br />
								{t(
									'If you have not received the email within a few minutes, please check your spam folder'
								)}
								.
							</span>

							<Button
								type="primary"
								htmlType="submit"
								style={{
									height: 'fit-content',
									width: '150px',
									fontSize: 16,
									lineHeight: 1.8,
									marginTop: 30,
									fontWeight: 700,
									backgroundColor: '#4BB543',
									borderColor: '#4BB543',
									borderRadius: 45,
									boxShadow: 'rgb(0 0 0 / 25%) 0px 2px 4px 0px',
								}}
								onClick={() => handleClick()}
							>
								{t('Ok')}
							</Button>
						</section>
					</section>
				</Content>
				<Footer>
					<FooterWave></FooterWave>
				</Footer>
			</Layout>
		</ConfigProvider>
	);
}
