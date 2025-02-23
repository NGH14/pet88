import React, { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { RiFileUserLine, RiMailSendLine, RiPhoneLine } from 'react-icons/ri';
import { NavLink, useLocation, useNavigate } from 'react-router';

import {
	Breadcrumb,
	Button,
	Card,
	Checkbox,
	ConfigProvider,
	DatePicker,
	Form,
	Input,
	Layout,
	Modal,
	Select,
	Table,
} from 'antd';
import viVN from 'antd/es/locale/vi_VN';
import axios from 'axios';
import SubNavBar from 'layouts/views/Header/SubHeader/SubHeader.jsx';
import moment from 'moment';
import { styled } from 'styled-components';

import { UserAuth } from '../../context/AuthContext';
import { SearchData } from '../../context/SearchContext';
import FooterWave from '../../layouts/views/Footer/Footer.jsx';
import AppHeader from '../../layouts/views/Navbar';
import './style.css';

const { Option } = Select;
const { Header, Content, Footer } = Layout;
const { Meta } = Card;
const { RangePicker } = DatePicker;
const { Column, ColumnGroup } = Table;

export default function Department() {
	const location = useLocation();
	const id = location.pathname.split('/')[2];

	const { search, setSearchList } = SearchData();
	const [loading, setLoading] = useState(true);
	const [loadingTable, setLoadingTable] = useState(true);
	const [form] = Form.useForm();
	const [form3] = Form.useForm();

	const [dataList, setDataList] = useState([]);
	const { user } = UserAuth();
	const navigate = useNavigate();
	const [selectedRooms, setSelectedRooms] = useState([]);
	const [sumPrice, setSumPrice] = useState(0);
	const photo =
		location.state.photos.length > 0
			? location.state.photos[0]
			: 'https://res.cloudinary.com/dggxjymsy/image/upload/v1667986972/pet88_upload/e10adb13acb1f3da8724a9149a58bd00_jwdh7h.jpg';

	const { t, i18n } = useTranslation();
	const [openDetailModal, setOpenDetailModal] = useState(false);

	useEffect(() => {
		handleLoadData();
	}, [search]);

	const onFinish = async values => {
		setLoadingTable(true);
		await handleLoadData();
		setSearchList({
			...search,
			datesGrooming: values.datesGrooming || null,
		});
	};

	const onFinishConfirm = async value => {
		const startDate = new Date(search?.datesGrooming);
		const endDate = new Date(moment(search?.datesGrooming).add(1, 'hours'));

		const prices = dataList
			.map(gr => {
				const isSelected = gr.roomNumbers.some(rn => {
					return selectedRooms.some(sr => sr.roomId === rn._id);
				});
				return isSelected ? Number(gr.price) : undefined;
			})
			.filter(gr => !!gr)
			.reduce((v, t) => t + v, 0);
		axios
			.post(`http://localhost:3001/api/order/grooming/booking`, {
				email: value?.email,
				userID: user?.id || 'guest',
				name: value?.name || 'guest',
				phone: value?.phone || '-1',
				roomList: selectedRooms,
				photo: photo,
				days: search.days,
				price: prices,
				start: startDate,
				end: endDate,
				paymentMethod: 'cash',
				service: search.services,
			})
			.then(response => {
				setLoading(false);
				navigate('/booking/success');
			})
			.catch(err => console.log(err.message));
	};

	const handleSelect = e => {
		const checked = e.target.checked;
		const value = e.target.value;
		const room = value.split('_');

		setSelectedRooms(
			!checked
				? selectedRooms.filter(item => item.roomId !== room[0])
				: [
						...selectedRooms,
						{
							roomId: room[0],
							price: room[1],
							roomNumber: room[2],
						},
					]
		);
	};

	const handleLoadData = async () => {
		setDataList([]);
		const startDate = new Date(search?.datesGrooming).getTime();
		const endDate = new Date(moment(search?.datesGrooming).add(2, 'hours')).getTime();

		await axios
			.post(`http://localhost:3001/api/hotel/availability/grooming/${id}`, {
				startDate,
				endDate,
			})
			.then(response => {
				setSumPrice(0);
				setSelectedRooms([]);
				setDataList(response.data);
				setLoading(false);
				setLoadingTable(false);
			})
			.catch(err => console.log(err.message));
	};

	const columnsWithDate = [
		{
			title: t('Name'),
			dataIndex: 'title',
			sorter: (a, b) => a.title.length - b.title.length,
		},
		{
			title: t('Type'),
			dataIndex: 'type',
		},
		{
			title: `${t('Service Price')}`,
			dataIndex: 'price',
			render: price => (
				<span>
					{` ${new Intl.NumberFormat('vi_VN', {
						style: 'currency',
						currency: 'VND',
					}).format(price)} / ${t('hour')}`}
				</span>
			),
			sorter: (a, b) => a.price - b.price,
		},
		{
			title: t('Room'),
			dataIndex: 'roomNumbers',
			render: (roomNumbers, record) =>
				roomNumbers.map(roomNumber => (
					<section className="room">
						<Checkbox
							value={`${roomNumber._id}_${record.price * search?.days}_${roomNumber.number}`}
							onChange={handleSelect}
						>
							{' '}
							{roomNumber.number}
						</Checkbox>
					</section>
				)),
		},
	];

	return (
		<section>
			<ConfigProvider locale={i18n.language === 'vi_VN' && viVN}>
				<Layout className="departhtLayout">
					<Header>
						<SubNavBar></SubNavBar>
						<AppHeader></AppHeader>
					</Header>
					<Content>
						<section className="grooming-page">
							<section className="grooming-page_containner">
								<section className="grooming-listroom">
									<section className="grooming-breadcum">
										<Breadcrumb separator=">">
											<Breadcrumb.Item>
												<NavLink to="/">{t('home')}</NavLink>
											</Breadcrumb.Item>
											<Breadcrumb.Item>
												<NavLink to={-1}>{t('list search')}</NavLink>
											</Breadcrumb.Item>
											<Breadcrumb.Item>{t('result')}</Breadcrumb.Item>
										</Breadcrumb>
									</section>
									<section
										style={{
											display: 'flex',
											justifyContent: 'space-between',
											alignItems: 'center',
										}}
									>
										<h2
											style={{
												fontWeight: 700,
												textTransform: 'capitalize',
												fontSize: 30,
											}}
										>
											{t('availability')}
										</h2>
										<section
											style={{
												display: 'flex',
												justifyContent: 'center',
												gap: 15,
												alignItems: 'center',
												fontWeight: 700,
											}}
										>
											<Button
												style={{ marginInline: 15 }}
												type="primary"
												disabled={!search.datesGrooming || selectedRooms.length <= 0}
												onClick={() => setOpenDetailModal(true)}
											>
												{t('Make an appointment')}
											</Button>
										</section>
									</section>
									<Modal
										title={t('Confirm Booking')}
										centered
										open={openDetailModal}
										footer={null}
										onCancel={() => setOpenDetailModal(false)}
									>
										<Form
											colon={false}
											form={form3}
											name="horizontal_appointment"
											layout="horizontal"
											initialValues={{
												name: user?.name,
												email: user?.email,
												phone: user?.phone,
											}}
											onFinish={onFinishConfirm}
											requiredMark={false}
										>
											<Form.Item
												rules={[
													{
														required: true,
														message: t('Please input name!'),
													},
												]}
												name="name"
												label={<RiFileUserLine />}
											>
												<Input placeholder={t('Name')} />
											</Form.Item>
											<Form.Item
												rules={[
													{
														required: true,
														message: t('Please input email!'),
													},
												]}
												name="email"
												label={<RiMailSendLine />}
											>
												<Input placeholder={t('Email')} />
											</Form.Item>

											<Form.Item
												rules={[
													{
														required: true,
														message: t('Please input phone number!'),
													},
												]}
												name="phone"
												label={<RiPhoneLine />}
											>
												<Input placeholder={t('Phone Number')} />
											</Form.Item>

											<Form.Item
												style={{
													display: 'flex',
													justifyContent: 'flex-end',

													marginBlock: '5px -5px',
												}}
											>
												<Button
													style={{
														marginInline: '0px 15px',
														height: 'fit-content',
														fontSize: 16,
														lineHeight: 1.8,
														borderRadius: 5,
													}}
													type="text"
													onClick={() => setOpenDetailModal(false)}
												>
													{t('Close')}
												</Button>
												<Button
													style={{
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
									</Modal>
									<section className="grooming-page_roomcontent">
										<Form
											form={form}
											requiredMark={false}
											name="form_bookingdepartpage"
											layout="horizontal"
											initialValues={{
												datesGrooming: search?.datesGrooming && moment(search?.datesGrooming),
											}}
											onValuesChange={onFinish}
										>
											<Form.Item name="datesGrooming" label={t('Booking time')}>
												<DatePicker
													defaultValue={search?.datesGrooming && moment(search?.datesGrooming)}
													showTime={{
														format: 'HH:mm',
													}}
													placement="bottomLeft"
													format={
														i18n.language === 'vi_VN' ? `HH:mm, DD-MM-YYYY` : 'HH:mm, YYYY-MM-DD '
													}
												/>
											</Form.Item>
										</Form>{' '}
										<Table
											style={{
												backgroundColor: 'white',
												padding: 20,
												marginBlock: 10,
												borderRadius: 15,
												boxShadow: 'rgb(153 196 227 / 25%) 0px 2px 8px',
											}}
											scroll={{
												x: 800,
											}}
											pagination={false}
											columns={columnsWithDate}
											dataSource={dataList}
											loading={loadingTable}
										/>
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
		</section>
	);
}
