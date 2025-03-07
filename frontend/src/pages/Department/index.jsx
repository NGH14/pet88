import React, { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { NavLink, useLocation, useNavigate } from 'react-router';

import {
	Breadcrumb,
	Button,
	Card,
	Checkbox,
	ConfigProvider,
	DatePicker,
	Form,
	Layout,
	Select,
	Table,
} from 'antd';
import viVN from 'antd/es/locale/vi_VN';
import axios from 'axios';
import SubNavBar from 'layouts/views/Header/SubHeader/SubHeader.jsx';
import moment from 'moment';

// import { UserAuth } from '../../context/AuthContext';
import { SearchData } from '../../context/SearchContext';
import FooterWave from '../../layouts/views/Footer/Footer.jsx';
import AppHeader from '../../layouts/views/NavBar/NavBar.jsx';
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
	const [dataList, setDataList] = useState([]);
	// const { user } = UserAuth();
	const navigate = useNavigate();
	const [selectedRooms, setSelectedRooms] = useState([]);
	const [sumPrice, setSumPrice] = useState(0);
	const [checkOutList, setcheckOutList] = useState([]);
	const photo =
		location.state.photos.length > 0
			? location.state.photos[0]
			: 'https://res.cloudinary.com/dggxjymsy/image/upload/v1667986972/pet88_upload/e10adb13acb1f3da8724a9149a58bd00_jwdh7h.jpg';
	const currentDate = moment();
	const futureMonth = moment(currentDate).add(1, 'M');
	const futureWeek = moment(currentDate).add(1, 'W');

	const { t, i18n } = useTranslation();

	useEffect(() => {
		handleLoadData();
	}, [search]);

	useEffect(() => {
		const sum = selectedRooms.reduce((sum, n) => sum + Number(n.price), 0);

		setSumPrice(sum);
		Object.entries(selectedRooms).forEach(([k, v]) => {
			if (v === 0) delete selectedRooms[k];
		});
	}, [selectedRooms, loadingTable]);

	const onFinish = async values => {
		setLoadingTable(true);
		await handleLoadData();
		setSearchList({
			...search,
			datesHotels: values.datesHotels || null,
		});
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

	const alldates =
		search.datesHotels || search.datesHotels?.length > 0
			? getDatesInRange(search.datesHotels[0], search.datesHotels[1])
			: [];

	const isAvailable = roomNumber => {
		const isFound = roomNumber.unavailableDates.some(date =>
			alldates.includes(new Date(date).getTime())
		);

		return !isFound;
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
		await axios
			.post(`http://localhost:3001/api/hotel/availability/${id}`, {
				dates: alldates,
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
			title: `${t('Price for')} ${search.days} nights`,
			dataIndex: 'price',
			render: price => (
				<span>
					{new Intl.NumberFormat('vi_VN', {
						style: 'currency',
						currency: 'VND',
					}).format(search.days * price)}
					{` (${new Intl.NumberFormat('vi_VN', {
						style: 'currency',
						currency: 'VND',
					}).format(price)} ${t('per night')})`}
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
							disabled={!isAvailable(roomNumber)}
						>
							{' '}
							{roomNumber.number}
						</Checkbox>
					</section>
				)),
		},
	];

	const columnsWithOutDate = [
		{
			title: t('Name'),
			dataIndex: 'title',
			sorter: (a, b) => a.title.length - b.title.length,
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
						<section className="department-page">
							<section className="department-page_containner">
								<section className="department-listroom">
									<section className="department-breadcum">
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
											{sumPrice !== 0 ? (
												<span
													style={{
														fontWeight: 700,
														fontSize: 23,
													}}
												>
													{'Total'}:{' '}
													{new Intl.NumberFormat('vi_VN', {
														style: 'currency',
														currency: 'VND',
													}).format(sumPrice)}
												</span>
											) : null}
											<Button type="primary" disabled={sumPrice <= 0 ? true : false}>
												<NavLink
													to={{
														pathname: '/checkout',
													}}
													state={{
														price: sumPrice,
														priceList: selectedRooms,
														depart: location.state,
													}}
												>
													{t('Reversion')}
												</NavLink>
											</Button>
										</section>
									</section>

									<section className="department-page_roomcontent">
										<Form
											form={form}
											requiredMark={false}
											name="form_bookingdepartpage"
											layout="horizontal"
											initialValues={{
												datesHotels: search.datesHotels && [
													moment(search?.datesHotels[0]),
													moment(search?.datesHotels[1]),
												],
											}}
											onValuesChange={onFinish}
										>
											<Form.Item
												name="datesHotels"
												style={{
													width: '100% !important',
												}}
											>
												<RangePicker
													style={{
														width: '100% !important',
													}}
													presets={{
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
											columns={search.days > 0 ? columnsWithDate : columnsWithOutDate}
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
