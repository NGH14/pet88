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
import SubNavBar from 'layouts/views/Header/SubHeader/SubHeader.jsx';

import { SearchData } from '../../context/SearchContext';
import FooterWave from '../../layouts/views/Footer/Footer.jsx';
import AppHeader from '../../layouts/views/Navbar';
import './style.css';

const { Step } = Steps;
const { Header, Content, Footer } = Layout;

export default function PaymentSuccess() {
	const { t, i18n } = useTranslation();
	const navigate = useNavigate();
	const { search } = SearchData();
	const [dataList, setDataList] = useState([]);

	useEffect(() => {
		fetchSuccess();
	}, []);

	const location = useLocation();
	const id = location.pathname.split('/')[3];

	const handleClick = () => {
		navigate('/', { replace: true });
	};
	const fetchSuccess = async () => {
		try {
			const res = await axios.put(`http://localhost:3001/api/order/success/${id}`);

			setDataList(res.data);
			handleUpdateDate(res.data);
		} catch (error) {
			console.error(error);
		}
	};

	const getDatesInRange = (startDate, endDate) => {
		const start = new Date(startDate);
		const end = new Date(endDate);
		const date = new Date(start.getTime());

		const dates = [];

		while (date <= end) {
			dates.push(new Date(date).getTime());
			date.setDate(date.getDate() + 1);
		}

		return dates;
	};

	const priceWithoutVAT = dataList?.products?.reduce(
		(total, room) => Number(total) + Number(room.price),
		0
	);

	const VAT = dataList?.price - priceWithoutVAT;

	const handleUpdateDate = async data => {
		try {
			const alldates = getDatesInRange(data.start, data.end);

			await Promise.all(
				data.products.map(room => {
					const res = axios.put(
						`http://localhost:3001/api/hotel-room/availability/${room.roomId}`,
						{
							dates: alldates,
						}
					);
					return res.data;
				})
			);
		} catch (err) {}
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
								<Step title={t('Your Payment')} description={t('Finish')} />
							</Steps>
						</section>

						<section className="payment_status-page">
							<BsCheck2Circle
								color="#4BB543"
								style={{
									fontSize: 50,
									marginBottom: 30,
								}}
							></BsCheck2Circle>
							<h1 style={{ fontWeight: 700 }}> {t('Payment Successfully')}</h1>
							<p> {t('Thank you for choosing Pet88')}</p>

							<section class="invoice-card">
								<section class="invoice-title">
									<img src={logo} alt="" style={{ height: 30 }} />
									<section id="main-title">
										<h4> PET88 {'INVOICE'}</h4>
										<span>{dataList.createdAt?.slice(0, 10)}</span>
									</section>

									<span id="date">No #{dataList?._id}</span>
								</section>

								<section class="invoice-details">
									<table class="invoice-table">
										<thead>
											<tr>
												<td>{'ROOM'}</td>
												<td>{'NIGHT'}</td>

												<td>PRICE</td>
											</tr>
										</thead>

										<tbody>
											{dataList?.products?.map(data => (
												<tr class="row-data">
													<td>
														{data.roomNumber} <span>(large)</span>
													</td>
													<td id="unit">{dataList.days}</td>
													<td>
														{' '}
														{new Intl.NumberFormat('vi_VN', {
															style: 'currency',
															currency: 'VND',
														}).format(data.price)}
													</td>
												</tr>
											))}
										</tbody>
									</table>
								</section>

								<section class="invoice-footer">
									<td>{t('VAT')} (8%)</td>
									<td>
										{' '}
										{new Intl.NumberFormat('vi_VN', {
											style: 'currency',
											currency: 'VND',
										}).format(VAT)}
									</td>
								</section>

								<section class="invoice-footer">
									<td>{t('Total')}</td>
									<td>
										{' '}
										{new Intl.NumberFormat('vi_VN', {
											style: 'currency',
											currency: 'VND',
										}).format(dataList?.price)}
									</td>
								</section>
							</section>

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
