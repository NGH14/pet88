import React, { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { NavLink, useLocation } from 'react-router';

import { RightOutlined } from '@ant-design/icons';
import {
	Avatar,
	Breadcrumb,
	Button,
	Card,
	ConfigProvider,
	DatePicker,
	Empty,
	Form,
	Input,
	Layout,
	Select,
	Skeleton,
	Typography,
	sectionider,
} from 'antd';
import viVN from 'antd/es/locale/vi_VN';
import axios from 'axios';
import SubNavBar from 'layouts/views/Header/SubHeader/SubHeader.jsx';
import moment from 'moment';

import departImg from '../../assets/images/e10adb13acb1f3da8724a9149a58bd00.jpg';
import { SearchData } from '../../context/SearchContext';
import FooterWave from '../../layouts/views/Footer/Footer.jsx';
import AppHeader from '../../layouts/views/Navbar';
import './style.css';

const { Option } = Select;
const { Header, Content, Footer } = Layout;
const { Meta } = Card;
const { RangePicker } = DatePicker;
const { Paragraph, Text } = Typography;

export default function Search() {
	const { state } = useLocation();
	const [loading, setLoading] = useState(true);
	const { search, setSearchList } = SearchData();

	const [type, setType] = useState(search?.services);
	const [form] = Form.useForm();
	const currentDate = moment();
	const futureMonth = moment(currentDate).add(1, 'M');
	const futureWeek = moment(currentDate).add(1, 'W');

	useEffect(() => {
		setTimeout(() => {
			setLoading(false);
		}, 2000);
	}, []);

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

	const { t, i18n } = useTranslation();
	const fetchHotelData = async value => {
		const city = value?.city;
		const alldates =
			value.datesHotels || value.datesHotels?.length > 0
				? getDatesInRange(value.datesHotels[0], value.datesHotels[1])
				: [];
		if (type === 'hotel') {
			try {
				const res = await axios.post(`http://localhost:3001/api/hotel/find-hotel-able`, {
					city,
					dates: alldates,
					services: type,
				});

				return res.data;
			} catch (error) {
				console.error(error);
			}
		} else if (type === 'grooming') {
			try {
				const res = await axios.post(`http://localhost:3001/api/hotel/find-grooming-able`, {
					city,
					services: type,
				});

				return res.data;
			} catch (error) {
				console.error(error);
			}
		}
	};

	const onFinish = async values => {
		setLoading(true);
		const foundData = await fetchHotelData(values);
		setSearchList({
			foundData,
			services: type,
			city: values.city,
			foundNumber: foundData?.length,
			datesHotels: values.datesHotels || null,
			datesGrooming: values.datesGrooming || null,
		});
		setLoading(false);
	};

	return (
		<section>
			<ConfigProvider locale={i18n.language === 'vi_VN' && viVN}>
				<Layout className="hotelLayout">
					<Header>
						<SubNavBar></SubNavBar>
						<AppHeader></AppHeader>
					</Header>
					<Content>
						<section className="hotel-page">
							<section className="hotel-page_containner">
								<section className="hotel-toolbox">
									<section>
										<h4
											style={{
												textTransform: 'uppercase',
												fontWeight: 700,
												marginBottom: 15,
											}}
										>
											{t('search')}
										</h4>
										<Form
											form={form}
											requiredMark={false}
											name="form_bookingdepartpage"
											layout="vertical"
											initialValues={{
												city: search?.city,
												datesHotels: search.datesHotels && [
													moment(search?.datesHotels[0]),
													moment(search?.datesHotels[1]),
												],
												services: search?.services,
												datesGrooming: search.datesGrooming && moment(search?.datesGrooming),
											}}
											onFinish={onFinish}
										>
											<Form.Item name="services" label={t('Services')}>
												<Select onChange={value => setType(value)} placeholder={t('Services')}>
													<Option value="hotel">{t('Hotel')}</Option>
													<Option value="grooming">{t('Grooming')}</Option>
												</Select>
											</Form.Item>
											<Form.Item name="city" placeholder={t('City name')} label={t('City name')}>
												<Select
													showSearch
													filterOption={(input, option) =>
														(option?.value ?? '').toLowerCase().includes(input.toLowerCase())
													}
													className="form-item_bookingdepartpage"
												>
													<Option value="Ho Chi Minh">{t('Ho Chi Minh')}</Option>
													<Option value="Ha Noi">{t('Ha Noi')}</Option>
													<Option value="Da Nang">{t('Da Nang')}</Option>
												</Select>
											</Form.Item>
											{type === 'hotel' ? (
												<Form.Item name="datesHotels" label={t('For these days')}>
													<RangePicker
														ranges={{
															[t('Today')]: [moment(), moment()],
															[t('One Week')]: [currentDate, futureWeek],
															[t('One Month')]: [currentDate, futureMonth],
														}}
														placeholder={[t('Drop off'), t('Pick up')]}
														placement="bottomLeft"
														className="form-item_bookingdepartpage"
														format={i18n.language === 'vi_VN' ? 'DD-MM-YYYY' : null}
													/>
												</Form.Item>
											) : null}

											{type === 'grooming' ? (
												<Form.Item name="datesGrooming" label={t('Booking time')}>
													<DatePicker
														className="form-item_bookingdepartpage"
														showTime={{
															format: 'HH:mm',
														}}
														placement="bottomLeft"
														format={
															i18n.language === 'vi_VN' ? `HH:mm, DD-MM-YYYY` : 'HH:mm, YYYY-MM-DD '
														}
													/>
												</Form.Item>
											) : null}
											<Form.Item shouldUpdate style={{ width: '100%' }}>
												<Button
													type="primary"
													block={true}
													className="form-button_bookingdepartpage"
													htmlType="submit"
												>
													{t('Search')}
												</Button>
											</Form.Item>
										</Form>{' '}
									</section>
								</section>
								<section className="hotel-page_content">
									{!loading ? (
										<>
											<section className="hotel-breadcum">
												<Breadcrumb separator=">">
													<Breadcrumb.Item>
														<NavLink to="/">{t('home')}</NavLink>
													</Breadcrumb.Item>
													<Breadcrumb.Item>{t('list search')}</Breadcrumb.Item>
												</Breadcrumb>
											</section>
											<h3 className="hotel-page_title">
												<span className="hotel-page_titlelight">
													{t('Available for')} <span className="hotel-page_title"> {t(type)}</span>{' '}
													{t('in')}{' '}
												</span>
												{t(search?.city)}
											</h3>
											<h3 className="hotel-page_subtitle">
												{t('found')} {search?.foundNumber} {t('properties')}
											</h3>
											<sectionider></sectionider>
										</>
									) : (
										<Skeleton
											active
											shape="round"
											loading={loading}
											paragraph={{
												rows: 1,
											}}
										/>
									)}

									{!loading && search?.foundData
										? search?.foundData.map((depart, index) => {
												return (
													<NavLink
														key={depart._id}
														to={
															search.services === 'hotel'
																? `/department/${depart._id}`
																: `/grooming/${depart._id}`
														}
														state={{
															...depart,
														}}
													>
														<Card
															hoverable
															style={{
																borderRadius: 15,
																width: '100%',
																marginTop: 16,
																boxShadow:
																	'rgb(0 0 0 / 5%) 0px 1px 1px, rgb(0 0 0 / 5%) 0px 2px 2px, rgb(0 0 0 / 5%) 0px 1px 1px, rgb(0 0 0 / 5%) 0px 1px 1px, rgb(0 0 0 / 5%) 0px 2px 10px',
															}}
														>
															<Skeleton
																active
																size="large"
																shape="round"
																loading={loading}
																avatar
																paragraph={{
																	rows: 4,
																}}
															>
																<Meta
																	style={{
																		minHeight: 150,
																	}}
																	avatar={
																		<Avatar
																			className="card_avatar"
																			style={{
																				width: 300,
																				height: '100%',
																				objectFit: 'cover',
																				borderRadius: 15,
																			}}
																			shape="square"
																			src={depart.photos.length > 0 ? depart.photos[0] : departImg}
																		/>
																	}
																	title={
																		<section>
																			<h3 className="card-depart_tilte">{t(depart.name)}</h3>
																			<p className="card-depart_address">
																				{t(depart.address)}, {t(depart.city)}
																			</p>
																		</section>
																	}
																	description={
																		search?.days ? (
																			<section className="card-depart_desc">
																				<Paragraph
																					ellipsis={{
																						rows: 4,
																					}}
																				>
																					{t(depart.desc)}
																				</Paragraph>
																				<p
																					style={{
																						textAlign: 'right',
																					}}
																				>
																					~{search?.days}
																				</p>
																			</section>
																		) : null
																	}
																></Meta>
															</Skeleton>
														</Card>
													</NavLink>
												);
											})
										: Array(4)
												.fill(null)
												.map(() => {
													return (
														<Card
															style={{
																borderRadius: 15,
																width: '100%',
																marginTop: 16,
															}}
														>
															<Skeleton
																active
																size="large"
																shape="round"
																loading={loading}
																avatar
																paragraph={{
																	rows: 4,
																}}
															></Skeleton>
														</Card>
													);
												})}

									{search?.foundData?.length === 0 ? <Empty></Empty> : null}
								</section>
							</section>
						</section>
					</Content>
					<Footer>
						<FooterWave></FooterWave>
					</Footer>
				</Layout>
			</ConfigProvider>
		</section>
	);
}
