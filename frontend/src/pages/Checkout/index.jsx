import React from 'react';
import { useTranslation } from 'react-i18next';
import { useLocation, useNavigate } from 'react-router';

import {
	Avatar,
	Button,
	Card,
	ConfigProvider,
	Form,
	Input,
	Layout,
	Radio,
	Skeleton,
	Steps,
} from 'antd';
import viVN from 'antd/es/locale/vi_VN';
import Meta from 'antd/lib/card/Meta';
import axios from 'axios';
import FooterWave from 'layouts/views/Footer/Footer.jsx';
import SubNavBar from 'layouts/views/Header/SubHeader/SubHeader.jsx';
import AppHeader from 'layouts/views/NavBar/NavBar.jsx';
import moment from 'moment';
import 'moment/locale/en-gb';
import 'moment/locale/vi';

// import { UserAuth } from '../../context/AuthContext';
import { SearchData } from '../../context/SearchContext';
import './style.css';

const { Step } = Steps;
const { Header, Content, Footer } = Layout;

export default function Checkout() {
	const location = useLocation();
	const priceWithoutVAT = location.state.price;
	const VAT = (location.state.price * 8) / 100;
	const totalPrice = Number(priceWithoutVAT + VAT);
	const sumPriceMap = location.state.priceList;
	const [loading, setLoading] = React.useState(false);
	const depart = location.state.depart;
	// const { user } = UserAuth();
	const photo =
		location.state.photos?.length > 0
			? location.state.photos[0]
			: 'https://res.cloudinary.com/dggxjymsy/image/upload/v1667986972/pet88_upload/e10adb13acb1f3da8724a9149a58bd00_jwdh7h.jpg';

	const { t, i18n } = useTranslation();
	const { search } = SearchData();
	const navigate = useNavigate();

	const onFinishUpdate = async value => {
		// console.log(value);
		handleCheckout(value);
	};

	const handleCheckout = async value => {
		setLoading(true);
		if (value?.paymentMethod === 'e-payment') {
			await axios
				.post(`http://localhost:3001/api/checkout/create-checkout-session`, {
					// email: user?.email,
					// userID: user?.id || 'guest',
					roomList: sumPriceMap,
					photo: photo,
					days: search.days,
					price: totalPrice,
					start: search.datesHotels[0],
					end: search.datesHotels[1],
					paymentMethod: value?.paymentMethod?.paymentMethod,
					service: search.services,
					...value,
				})
				.then(response => {
					setLoading(false);
					window.location.href = response.data.url;
				})
				.catch(err => console.log(err.message));
		}

		if (value?.paymentMethod === 'cash') {
			await axios
				.post(`http://localhost:3001/api/order/cash`, {
					// email: user?.email,
					// userID: user?.id || 'guest',
					roomList: sumPriceMap,
					photo: photo,
					days: search.days,
					price: totalPrice,
					start: search.datesHotels[0],
					end: search.datesHotels[1],
					paymentMethod: value?.paymentMethod,
					service: search.services,

					...value,
				})
				.then(response => {
					setLoading(false);
					navigate('/booking/success');
				})
				.catch(err => console.log(err.message));
		}
	};

	moment.locale(i18n.language);

	const checkInDate =
		search.datesHotels?.length > 0 && i18n.language === 'vi_VN'
			? moment(new Date(search.datesHotels[0]).getTime()).format('ddd, DD MMMM YYYY')
			: moment(new Date(search.datesHotels[0]).getTime()).format('ddd, MMM DD YYYY');

	const checkOutDate =
		search.datesHotels?.length > 0 && i18n.language === 'vi_VN'
			? moment(new Date(search.datesHotels[1]).getTime()).format('ddd, DD MMMM YYYY')
			: moment(new Date(search.datesHotels[1]).getTime()).format('ddd, MMM DD YYYY');

	return (
		<ConfigProvider locale={i18n.language === 'vi_VN' && viVN}>
			<Layout className="departhtLayout">
				<Header>
					<SubNavBar></SubNavBar>
					<AppHeader></AppHeader>
				</Header>
				<Content>
					<section className="checkout-page">
						<section className="checkout_wrapper">
							<section className="checkoutpage_step">
								<Steps current={1} size="small">
									<Step title={t('Your Selection')} description={t('Finish')} />
									<Step title={t('Your Details')} description={t('In Progress')} />
									<Step title={t('Your Payment')} description={t('Next')} />
								</Steps>
							</section>
							<section className="checkoutpage_content">
								<section className="checkoutpage_content-left">
									<section className="checkout_toolbox">
										<h2 className="toolbox_title">{t('Your booking details')}</h2>
										<section className="checkout_date">
											<section className="checkout_checkin">
												<h3 className="checkout-sub">{t('Drop off')}</h3>
												<p className="checkout-dates_text">{checkInDate}</p>
											</section>

											<section className="checkout_checkout">
												<h3 className="checkout-sub">{t('Pick up')}</h3>
												<p className="checkout-dates_text">{checkOutDate}</p>
											</section>
										</section>
										<></>
										<section className="checkout_days">
											<h3 className="checkout_subtitle">
												{t('Total length of pet stay')}
												{':'}
											</h3>
											<p className="checkout-dates_text">{`${search.days} ${t('nights')}`}</p>
										</section>
									</section>

									<section className="checkout_toolbox">
										<h2 className="toolbox_title">{t('Your price summary')}</h2>
										<section className="checkout_price">
											<section className="checkout_counting">
												<h3 className="checkout-sub">{t('Room')}</h3>
												<p className="checkout-dates_text">
													{new Intl.NumberFormat('vi_VN', {
														style: 'currency',
														currency: 'VND',
													}).format(priceWithoutVAT)}
												</p>
											</section>
											<section className="checkout_counting">
												<h3 className="checkout-sub">8% {t('VAT')}</h3>
												<p className="checkout-dates_text">
													{new Intl.NumberFormat('vi_VN', {
														style: 'currency',
														currency: 'VND',
													}).format(VAT)}
												</p>
											</section>
										</section>
										<></>
										<section className="checkout_counting">
											<section className="checkout_total">
												<h3 className="checkout_subtitle">
													{t('Price')}
													{':'}
												</h3>
												<span className="checkout_subtitle">{`(${t('For')} ${search.days} ${t('nights')})`}</span>
											</section>
											<p className="checkout-dates_text">
												{new Intl.NumberFormat('vi_VN', {
													style: 'currency',
													currency: 'VND',
												}).format(totalPrice)}
											</p>
										</section>
									</section>
								</section>

								<section className="checkoutpage_content-right">
									<section className="checkout_toolbox">
										<Card
											style={{
												width: '100%',
												border: 'none',
											}}
										>
											<Skeleton
												active
												loading={false}
												size="large"
												shape="round"
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
															src={depart.photos.length > 0 ? depart.photos[0] : ''}
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
												></Meta>
											</Skeleton>
										</Card>
									</section>

									<section className="checkout_toolbox">
										<Form
											validateTrigger="onBlur"
											labelCol={{ span: 4 }}
											// name="update user"
											size={'large'}
											layout="vertical"
											initialValues={{
												// name: user?.name,
												// phone: user?.phone,
												paymentMethod: 'e-payment',
												// email: user?.email,
											}}
											onFinish={onFinishUpdate}
											autoComplete="off"
											requiredMark={false}
										>
											<Form.Item
												label={t('Name')}
												name="name"
												rules={[
													{
														required: true,
														// message: t('Please input your username!'),
													},
												]}
											>
												<Input />
											</Form.Item>

											<Form.Item type="number" name="phone" label={t('Phone Number')}>
												<Input
													style={{
														width: '100%',
													}}
												/>
											</Form.Item>
											<Form.Item label="Email" name="email">
												<Input />
											</Form.Item>
											<Form.Item name="paymentMethod" label={t('Payment')}>
												<Radio.Group>
													<Radio value="cash"> {t('Cash')}</Radio>
													<Radio value="e-payment"> {t('E-payment')}</Radio>
												</Radio.Group>
											</Form.Item>
											<Form.Item
												style={{
													display: 'flex',
													justifyContent: 'flex-end',
												}}
											>
												<Button
													loading={loading}
													style={{
														marginBlock: '0px auto',
														height: 'fit-content',
														fontSize: 16,
														lineHeight: 1.8,
														borderRadius: 5,
														boxShadow: 'rgb(0 0 0 / 25%) 0px 2px 4px 0px',
													}}
													type="primary"
													htmlType="submit"
												>
													{t('Confirm')}
												</Button>
											</Form.Item>
										</Form>
									</section>
								</section>
							</section>
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
