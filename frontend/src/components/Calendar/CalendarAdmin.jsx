import React, { useCallback, useMemo, useRef, useState } from 'react';
import { Calendar as RB, momentLocalizer } from 'react-big-calendar';
import withDragAndDrop from 'react-big-calendar/lib/addons/dragAndDrop';
import 'react-big-calendar/lib/addons/dragAndDrop/styles.css';
import 'react-big-calendar/lib/css/react-big-calendar.css';
import 'react-datepicker/dist/react-datepicker.css';
import Draggable from 'react-draggable';
import { useTranslation } from 'react-i18next';
import { IoIosArrowBack, IoIosArrowForward } from 'react-icons/io';
import {
	RiCalendarEventFill,
	RiCloseFill,
	RiCoinLine,
	RiDeleteBinLine,
	RiEditLine,
	RiFileTextLine,
	RiMailLine,
	RiPhoneLine,
	RiShoppingCartLine,
	RiUser3Line,
	RiUserSettingsLine,
} from 'react-icons/ri';
import { toast } from 'react-toastify';

import {
	Button,
	Calendar,
	Cascader,
	Checkbox,
	ConfigProvider,
	Dropdown,
	Form,
	Input,
	Menu,
	Modal,
	Select,
	Typography,
} from 'antd';
// import 'moment/locale/en';

import vi_VN from 'antd/locale/vi_VN';
import axios from 'axios';
import moment from 'moment';
import 'moment/locale/vi';

// import { UserAuth } from '../../context/AuthContext';
import UUID from '../../hooks/useUUID';
import useWindowDimensions from '../../hooks/useWindowDimensions';
import './style.css';

const DnDCalendar = withDragAndDrop(RB);
const { Paragraph } = Typography;

const events = [
	{
		id: UUID(),
		title: 'Big Meeting',
		allDay: true,
		start: new Date(2022, 11, 1),
		end: new Date(2022, 11, 15),
	},
];

console.log(events);

const API = process.env.REACT_APP_API;

const langMessage = {
	en: {
		previous: '<',
		next: '>',
	},
	vi_VN: {
		week: 'Tuần',
		work_week: 'Ngày trong tuần',
		day: 'Ngày',
		month: 'Tháng',
		previous: '<',
		next: '>',
		today: 'Hôm nay',
		agenda: 'Lịch trình',
		date: 'Ngày',
		time: 'Thời gian',
		event: 'Sự kiện',
		allDay: 'cả ngày',
		noEventsInRange: 'Không có sự kiện nào',

		showMore: total => `+${total} Xem Thêm`,
	},
};

export const CalendarAdmin = () => {
	const [allEvents, setAllEvents] = useState(events);
	const [setEvent] = useState({});
	const [selectedGroomingRoomId, setSelectedGroomingRoomId] = useState('');
	const [selectedGroomingRoomData, setSelectedGroomingRoomData] = useState({});
	const [subCalendarCollapse, setSubCalendarCollapse] = useState(false);
	const [groomingListOption, setGroomingListOption] = useState({});
	const [defaultDate, setDefaultDate] = useState(new Date());
	const [defaulGroomingOpion, setDefaulGroomingOpion] = useState([]);
	const [calendarAdminPanel, setCalendarAdminPanel] = useState('day');
	const [selectedDate, setSelectedDate] = useState({
		start: 0,
		end: 0,
		price: 0,
	});
	const [selecteDetaildDate, setSelectedDetailDate] = useState({});
	const [selecteDetailType, setSelecteDetailType] = useState(false);
	// const { GetAllUser } = UserAuth();
	const photo =
		'https://res.cloudinary.com/dggxjymsy/image/upload/v1667986972/pet88_upload/e10adb13acb1f3da8724a9149a58bd00_jwdh7h.jpg';
	const [disabled, setDisabled] = useState(false);
	const [userData, setUserData] = React.useState([]);
	const [userDataOption, setUserDataOption] = React.useState([]);
	const { t, i18n } = useTranslation();
	const localizer = momentLocalizer(moment);
	const [openCreateModal, setOpenCreateModal] = useState(false);
	const [openDetailModal, setOpenDetailModal] = useState(false);
	const [accountType, setAccountType] = React.useState(false);
	const { width } = useWindowDimensions();
	const [form] = Form.useForm();
	const [bounds, setBounds] = useState({
		left: 0,
		top: 0,
		bottom: 0,
		right: 0,
	});
	const draggleRef = useRef(null);
	moment.locale(i18n.language);

	React.useEffect(() => form.resetFields());

	const onChange = (value, selectedOptions) => {
		setSelectedGroomingRoomId(selectedOptions[1].value);
		setSelectedGroomingRoomData(selectedOptions[0]);
		fetchEvent(selectedOptions[1].value);
	};
	const filter = (inputValue, path) =>
		path.some(option => option.label.toLowerCase().indexOf(inputValue.toLowerCase()) > -1);

	const onStart = (_event, uiData) => {
		const { clientWidth, clientHeight } = window.document.documentElement;
		const targetRect = draggleRef.current?.getBoundingClientRect();
		if (!targetRect) {
			return;
		}
		setBounds({
			left: -targetRect.left + uiData.x,
			right: clientWidth - (targetRect.right - uiData.x),
			top: -targetRect.top + uiData.y,
			bottom: clientHeight - (targetRect.bottom - uiData.y),
		});
	};

	React.useEffect(() => {
		fetchGroomingData();
		getAllUserData();
	}, []);

	React.useEffect(() => {
		if (width < 720) {
			setDisabled(true);
			setBounds({
				left: 0,
				top: 0,
				bottom: 0,
				right: 0,
			});
		} else {
			setDisabled(false);
		}
	}, [width]);

	const fetchGroomingData = async () => {
		try {
			const res = await axios.get(`${API}/grooming`);

			const list = [];
			res.data.map(data => {
				const children = data.roomNumbers?.map(r => {
					return {
						value: r?._id,
						label: `Room ${r?.number}`,
					};
				});
				return list.push({
					...data,
					value: data._id,

					label: data.title,
					children,
				});
			});
			setGroomingListOption(list);
			setDefaulGroomingOpion([list[0].value, list[0].children[0].value]);
			fetchEvent(list[0].children[0].value);
			setSelectedGroomingRoomId(list[0].children[0].value);
			setSelectedGroomingRoomData(list[0]);
		} catch (error) {
			console.error(error);
		}
	};

	const fetchEvent = async id => {
		const roomId = id || selectedGroomingRoomId;
		try {
			const res = await axios.get(`${API}/grooming/room/${roomId}`);

			const list = [];
			res.data.unavailableDates.map(data => {
				return list.push({
					start: new Date(data.startDate),
					end: new Date(data.endDate),
					id: data.id,
					title: data.title,
					order: data.order,
				});
			});

			setAllEvents(list);
		} catch (error) {
			console.error(error);
		}
	};

	const FetchAddEvent = async value => {
		try {
			await axios.put(`${API}/grooming/availability/${selectedGroomingRoomId}`, {
				dates: {
					name: value.name,
					startDate: value.start,
					endDate: value.end,
					id: value.id,
					title: value.title,
					order: value.order,
				},
			});
			form.resetFields();
		} catch (error) {
			console.error(error);
		}
	};

	const FetchUpdateEvent = async value => {
		const startDate = value?.start || selecteDetaildDate?.start;
		const endDate = value?.end || selecteDetaildDate?.end;
		const title = value?.title || selecteDetaildDate?.title;
		const id = value?.id || selecteDetaildDate.id;
		const order =
			{
				...selecteDetaildDate?.order,
				name: value.name,
				email: value.email,
				phone: value.phone,
			} || selecteDetaildDate?.order;

		try {
			await axios.put(`${API}/grooming/room/event/${id}`, {
				startDate,
				endDate,
				title,
				order,
			});
			form.resetFields();
		} catch (error) {
			console.error(error);
		}
	};

	const FetchUpdateReSizeEvent = async value => {
		const startDate = value?.start || selecteDetaildDate?.start;
		const endDate = value?.end || selecteDetaildDate?.end;
		const title = value?.title || selecteDetaildDate?.title;
		const id = value?.id || selecteDetaildDate.id;
		const order = value?.order;
		const price =
			(new Date(endDate).getHours() - new Date(startDate).getHours()) *
			1 *
			selectedGroomingRoomData?.price;

		const orderPrice = price > 0 ? price : selectedGroomingRoomData?.price;

		try {
			await Promise.all([
				axios.put(`${API}/grooming/room/event/${id}`, {
					startDate,
					endDate,
					title,
					order,
				}),

				axios.put(`${API}/order/${order._id}`, {
					...order,
					start: startDate,
					endDate: endDate,
					price: orderPrice,
				}),
			]);
		} catch (error) {
			console.error(error);
		}
	};

	const FetchDeleteEvent = async value => {
		const id = value.id || selecteDetaildDate.id;
		try {
			await Promise.all([
				axios.put(`${API}/grooming/room/event/delete/${id}`),
				axios.put(`${API}/order/update-status/${selecteDetaildDate.order._id}`, {
					paid: 'cancel',
					confirm: 'cancel',
				}),
			]);
		} catch (error) {
			console.error(error);
		}
	};

	const onPanelChange = value => {
		setCalendarAdminPanel(value);
	};

	const onSubCalendarSelected = newValue => {
		setDefaultDate(newValue.toDate());
	};

	const handleSelectEvent = event => {
		setOpenDetailModal(true);
		setSelecteDetailType(false);
		setSelectedDetailDate(event);
	};

	const { messages } = useMemo(
		() => ({
			messages: langMessage[i18n.language],
		}),
		[i18n.language]
	);
	console.log(accountType);
	const handleSelectSlot = ({ start, end }) => {
		const price =
			(new Date(end).getHours() - new Date(start).getHours()) * 1 * selectedGroomingRoomData?.price;

		if (price > 0) {
			setOpenCreateModal(true);
			setSelectedDate({ start, end, price });
		}

		if (price <= 0) {
			setOpenCreateModal(true);
			setSelectedDate({
				start,
				end,
				price: selectedGroomingRoomData?.price,
			});
		}
	};

	const moveEvent = ({ event, start, end }) => {
		FetchUpdateReSizeEvent({
			...event,
			start,
			end,
		});

		setAllEvents(prev => {
			const existing = prev.find(ev => ev.id === event.id) ?? {};
			const filtered = prev.filter(ev => ev.id !== event.id);
			return [...filtered, { ...existing, start, end }];
		});
	};
	const resizeEvent = ({ event, start, end }) => {
		FetchUpdateReSizeEvent({
			...event,
			start,
			end,
		});

		setAllEvents(prev => {
			const existing = prev.find(ev => ev.id === event.id) ?? {};
			const filtered = prev.filter(ev => ev.id !== event.id);
			return [...filtered, { ...existing, start, end }];
		});
	};

	const onNavigate = newDate => setDefaultDate(newDate);

	const getAllUserData = async () => {
		try {
			const list = [];
			const option = [];

			const users = await GetAllUser();
			users.forEach(doc => {
				list.push({ id: doc.id, ...doc.data(), key: doc.id });
			});
			list.forEach(doc => {
				option.push({ value: doc.email, label: doc.email });
			});
			setUserDataOption(option);
			setUserData(list);
		} catch (error) {
			toast.error(t('Fail to load email data'));
			console.log(error);
		}
	};

	const slotPropGetter = useCallback(
		date => ({
			className: 'slotDefault',
			...(moment(date).hour() < 8 && {
				style: {
					backgroundColor: '#e6e6e6',
					color: 'black',
				},
			}),
			...(moment(date).hour() > 22.25 && {
				style: {
					backgroundColor: '#e6e6e6',
					color: 'black',
				},
			}),
		}),
		[]
	);

	const onFinishCreateEvent = async values => {
		const start = selectedDate?.start;
		const end = selectedDate?.end;
		const title = values?.title;
		const price =
			(new Date(selectedDate?.end).getHours() - new Date(selectedDate?.start).getHours()) *
			1 *
			selectedGroomingRoomData.price;

		const bookingUser = values.account
			? userData.find(u => u.email === values.email)
			: {
					id: 'guest',
					email: values.email || 'guest',
					phone: values.phone,
					name: values.name,
				};

		if (values?.title) {
			const eventID = UUID();

			const orderPrice = price !== 0 ? price : selectedGroomingRoomData?.price;

			try {
				const order = await axios.post(`${API}/order/admin/grooming`, {
					email: bookingUser.email || 'guest',
					eventID,
					userID: bookingUser.id || 'guest',
					phone: bookingUser.phone || '0',
					roomList: selectedGroomingRoomId,
					photo: photo,
					days: 0,
					price: orderPrice,
					start,
					name: bookingUser.name || 'guest',
					end,
					paymentMethod: 'cash',
					service: 'grooming',
				});
				const event = {
					id: eventID,
					start: start,
					end: end,
					title,
					order: order.data,
				};
				FetchAddEvent(event);
				setEvent(event);

				setAllEvents(prev => [...prev, event]);
				setOpenCreateModal(false);
			} catch (error) {
				console.error(error);
				setOpenCreateModal(false);
			}
		}
	};

	const onFinishUpdateEvent = values => {
		const title = values?.title;
		if (values?.title) {
			FetchUpdateEvent(values);
			setAllEvents(
				allEvents.map(obj => {
					if (obj.id === selecteDetaildDate.id) {
						return {
							...obj,
							title,
							order: {
								...obj.order,
								name: values.name,
								email: values.email,
								phone: values.phone,
							},
						};
					}
					return obj;
				})
			);
			setOpenCreateModal(false);
		}
		setOpenDetailModal(false);
	};

	const handleDeleteEvent = () => {
		FetchDeleteEvent(selecteDetaildDate.id);
		setAllEvents(allEvents.filter(item => item.id !== selecteDetaildDate.id));
		setOpenDetailModal(false);
		selecteDetaildDate();
	};
	return (
		<ConfigProvider locale={i18n.language}>
			<section className="calendar-container">
				<Modal
					title={
						<section
							className="createEvent_btn"
							style={{
								width: '100%',
								cursor: 'move',
							}}
							onMouseOver={() => {
								if (disabled) {
									setDisabled(false);
								}
							}}
							onMouseOut={() => {
								setDisabled(true);
							}}
							onFocus={() => {}}
							onBlur={() => {}}
							// end
						>
							{t('Add new event')}
						</section>
					}
					modalRender={modal => (
						<Draggable
							cancel=".drag-button_modal .createEvent_form .createEvent_btn"
							disabled={disabled}
							bounds={bounds}
							onStart={(event, uiData) => onStart(event, uiData)}
						>
							<section ref={draggleRef}>{modal}</section>
						</Draggable>
					)}
					centered
					open={openCreateModal}
					onOk={() => setOpenCreateModal(false)}
					footer={null}
					onCancel={() => setOpenCreateModal(false)}
				>
					<Form
						className="createEvent_form"
						colon={false}
						form={form}
						name="horizontal_login"
						layout="horizontal"
						onFinish={onFinishCreateEvent}
						requiredMark={false}
					>
						<Form.Item
							label={
								<RiFileTextLine
									style={{
										fontSize: 14,
										textTransform: 'capitalize',
									}}
								></RiFileTextLine>
							}
							name="title"
							rules={[
								{
									required: true,
									message: t('Please enter the title'),
								},
							]}
						>
							<Input placeholder={t('Enter event title')} />
						</Form.Item>

						{accountType ? (
							<Form.Item name="email" label={<RiMailLine />}>
								<Select
									showSearch
									options={userDataOption}
									filterOption={(input, option) =>
										(option?.label ?? '').toLowerCase().includes(input.toLowerCase())
									}
								></Select>
							</Form.Item>
						) : (
							<>
								<Form.Item name="name" label={<RiUser3Line />}>
									<Input />
								</Form.Item>
								<Form.Item name="email" label={<RiMailLine />}>
									<Input />
								</Form.Item>

								<Form.Item name="phone" label={<RiPhoneLine />}>
									<Input />
								</Form.Item>
							</>
						)}

						<Form label={<RiUserSettingsLine />} name="account">
							{/* <Radio.Group
								value={accountType}
								onChange={(e) => setAccountType(e.target.value)}
							>
								<Radio value={false}>{t('Guest')}</Radio>
								<Radio value={true}>{t('Has Account')}</Radio>
							</Radio.Group> */}
							<Checkbox
								checked={accountType}
								defaultChecked={accountType}
								onChange={e => setAccountType(e.target.checked)}
							>
								Has Account
							</Checkbox>
						</Form>
						<Form.Item
							style={{
								marginBottom: 0,
							}}
						>
							<Form.Item
								label={
									<RiCalendarEventFill
										style={{
											fontSize: 14,
											textTransform: 'capitalize',
										}}
									></RiCalendarEventFill>
								}
								name="start"
								style={{
									display: 'flex',
									alignContent: 'center',
								}}
							>
								<span>
									{moment(new Date(selectedDate?.start).getTime()).format(
										'dddd, DD MMM YYYY _ hh:mm A'
									)}{' '}
									- {moment(new Date(selectedDate?.end).getTime()).format('hh:mm A')}{' '}
								</span>
							</Form.Item>
						</Form.Item>
						<Form.Item
							label={
								<RiCoinLine
									style={{
										fontSize: 14,
										textTransform: 'capitalize',
									}}
								></RiCoinLine>
							}
							name="start"
							style={{
								display: 'flex',
								alignContent: 'center',
							}}
						>
							<span>
								{new Intl.NumberFormat('vi-VN', {
									style: 'currency',
									currency: 'VND',
								}).format(selectedDate?.price)}
							</span>
						</Form.Item>
						<Form.Item
							className="drag-button_modal"
							style={{
								display: 'flex',
								justifyContent: 'flex-end',
								marginBlock: '5px -5px',
							}}
						>
							<Button
								className="drag-button_modal"
								style={{
									marginInline: '0px 15px',
									height: 'fit-content',
									fontSize: 16,
									lineHeight: 1.8,
									borderRadius: 5,
								}}
								type="text"
								onClick={() => setOpenCreateModal(false)}
							>
								{t('Close')}
							</Button>
							<Button
								className="drag-button_modal"
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

				<Modal
					closable={false}
					title={
						<section
							style={{
								width: '100%',
								cursor: 'move',
								display: 'flex',
								justifyContent: 'flex-end',
							}}
							onMouseOver={() => {
								if (disabled) {
									setDisabled(false);
								}
							}}
							onMouseOut={() => {
								setDisabled(true);
							}}
							onFocus={() => {}}
							onBlur={() => {}}
						>
							<Button className="drag-button_modal" type="text" onClick={() => handleDeleteEvent()}>
								<RiDeleteBinLine></RiDeleteBinLine>{' '}
							</Button>
							<Button
								className="drag-button_modal"
								type="text"
								onClick={() => setSelecteDetailType(!selecteDetailType)}
							>
								<RiEditLine></RiEditLine>{' '}
							</Button>
							<Button
								className="drag-button_modal"
								type="text"
								onClick={() => setOpenDetailModal(false)}
							>
								<RiCloseFill
									style={{
										fontSize: 18,
									}}
								></RiCloseFill>{' '}
							</Button>
						</section>
					}
					modalRender={modal => (
						<Draggable
							cancel=".drag-button_modal .updateEvent_form"
							disabled={disabled}
							bounds={bounds}
							onStart={(event, uiData) => onStart(event, uiData)}
						>
							<section ref={draggleRef} style={{}}>
								{modal}
							</section>
						</Draggable>
					)}
					centered
					open={openDetailModal}
					onOk={() => setOpenDetailModal(false)}
					footer={null}
					onCancel={() => setOpenDetailModal(false)}
				>
					<Form
						className="updateEvent_form"
						colon={false}
						form={form}
						name="horizontal_login"
						layout="horizontal"
						initialValues={{
							title: selecteDetaildDate?.title,
							name: selecteDetaildDate?.order?.name,
							email: selecteDetaildDate?.order?.email,
							phone: selecteDetaildDate?.order?.phone,
						}}
						onFinish={onFinishUpdateEvent}
						requiredMark={false}
					>
						<Form.Item
							label={
								<RiFileTextLine
									style={{
										fontSize: 14,

										textTransform: 'capitalize',
									}}
								></RiFileTextLine>
							}
							name="title"
							rules={[
								{
									required: true,
									message: t('Please enter the title'),
								},
							]}
						>
							{selecteDetailType ? (
								<Input placeholder={t('Enter event title')} />
							) : (
								<span>{selecteDetaildDate?.title}</span>
							)}
						</Form.Item>
						<Form.Item name="name" label={<RiUser3Line />}>
							{selecteDetailType ? (
								<Input placeholder={t('Enter event title')} />
							) : (
								<span>{selecteDetaildDate?.order?.name}</span>
							)}
						</Form.Item>
						<Form.Item name="email" label={<RiMailLine />}>
							{selecteDetailType ? (
								<Input placeholder={t('Enter event title')} />
							) : (
								<span>{selecteDetaildDate?.order?.email}</span>
							)}
						</Form.Item>
						<Form.Item name="phone" label={<RiPhoneLine />}>
							{selecteDetailType ? (
								<Input placeholder={t('Enter event title')} />
							) : (
								<span>{selecteDetaildDate?.order?.phone}</span>
							)}
						</Form.Item>
						<Form.Item
							style={{
								marginBottom: 0,
							}}
						>
							<Form.Item
								label={
									<RiCalendarEventFill
										style={{
											fontSize: 14,
											textTransform: 'capitalize',
										}}
									></RiCalendarEventFill>
								}
								style={{
									display: 'flex',
									alignContent: 'center',
								}}
							>
								<span>
									{moment(new Date(selecteDetaildDate?.start).getTime()).format('hh:mm A')} -{' '}
									{moment(new Date(selecteDetaildDate?.end).getTime()).format('hh:mm A')}
								</span>
							</Form.Item>
						</Form.Item>
						<Form.Item
							label={
								<RiCoinLine
									style={{
										fontSize: 14,
										textTransform: 'capitalize',
									}}
								></RiCoinLine>
							}
							name="start"
							style={{
								display: 'flex',
								alignContent: 'center',
							}}
						>
							<span>
								{new Intl.NumberFormat('vi-VN', {
									style: 'currency',
									currency: 'VND',
								}).format(
									(new Date(selecteDetaildDate?.end).getHours() -
										new Date(selecteDetaildDate?.start).getHours()) *
										1 *
										selectedGroomingRoomData.price
								)}
							</span>
						</Form.Item>
						<Form.Item label={<RiShoppingCartLine />}>
							<Paragraph
								copyable={{
									tooltips: false,
								}}
							>
								{selecteDetaildDate?.order?._id}
							</Paragraph>
						</Form.Item>
						<Form.Item
							style={{
								display: 'flex',
								justifyContent: 'flex-end',

								marginBlock: '5px -5px',
							}}
						>
							<Button
								className="drag-button_modal"
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
							{selecteDetailType ? (
								<Button
									className="drag-button_modal"
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
							) : null}
						</Form.Item>
					</Form>
				</Modal>
				<section
					className="site-calendar-customize-header-wrapper"
					style={subCalendarCollapse ? { display: 'none' } : null}
				>
					<Calendar
						headerRender={({ value, onChange }) => {
							const date = value.format('MMMM, YYYY');
							const menu = (
								<Menu>
									<Menu.Item>
										<Button
											block
											size="middle"
											onClick={() => {
												const newValue = moment(value).add(1, 'W');
												onChange(newValue);
											}}
										>
											1 {t('week')}
										</Button>
									</Menu.Item>
									<Menu.Item>
										<Button
											block
											size="middle"
											onClick={() => {
												const newValue = moment(value).add(2, 'W');
												onChange(newValue);
											}}
										>
											2 {t('weeks')}
										</Button>
									</Menu.Item>
									<Menu.Item>
										<Button
											block
											size="middle"
											onClick={() => {
												const newValue = moment(value).add(3, 'W');
												onChange(newValue);
											}}
										>
											3 {t('weeks')}
										</Button>
									</Menu.Item>
									<Menu.Item>
										<Button
											block
											size="middle"
											onClick={() => {
												const newValue = moment(value).add(4, 'W');
												onChange(newValue);
											}}
										>
											4 {t('weeks')}
										</Button>
									</Menu.Item>
								</Menu>
							);
							return (
								<section>
									<section
										style={{
											display: 'flex',
											justifyContent: 'space-between',
											alignItems: 'center',
										}}
									>
										<span
											style={{
												textTransform: 'capitalize',
												fontSize: 14,
												fontWeight: 600,
											}}
										>
											{date}
										</span>
										<section style={{ display: 'flex', gap: 5 }}>
											<Button
												style={{ padding: 0 }}
												type="text"
												onClick={() => {
													const newValue = moment(value).subtract(1, 'M');
													onChange(newValue);
												}}
											>
												<IoIosArrowBack />
											</Button>
											<Button
												style={{ padding: 0 }}
												type="text"
												onClick={() => {
													const newValue = moment(value).add(1, 'M');
													onChange(newValue);
												}}
											>
												<IoIosArrowForward />
											</Button>
										</section>
									</section>
									<Dropdown overlay={menu}>
										<Button
											block
											style={{
												marginBlock: 20,
												boxShadow: 'rgb(112 144 176 / 20%) 0px 2px 8px',
											}}
										>
											{t('Quick Jump')}
										</Button>
									</Dropdown>
								</section>
							);
						}}
						fullscreen={false}
						onSelect={onSubCalendarSelected}
					/>

					{groomingListOption.length > 0 ? (
						<Cascader
							style={{ width: '100%' }}
							size="middle"
							matchInputWidth
							defaultValue={defaulGroomingOpion}
							block
							options={groomingListOption}
							onChange={onChange}
							placeholder="Please select"
							showSearch={{
								filter,
							}}
							onSearch={value => console.log(value)}
						/>
					) : null}
				</section>
				<section className="">
					<section className="-vertical">
						<section className="center-element">
							<Button
								style={{}}
								// type='text'
								shape="circle"
								icon={
									!subCalendarCollapse ? (
										<IoIosArrowBack style={{ fontSize: 12 }} />
									) : (
										<IoIosArrowForward style={{ fontSize: 12 }} />
									)
								}
								onClick={() => setSubCalendarCollapse(!subCalendarCollapse)}
							/>
						</section>
					</section>
				</section>
				<DnDCalendar
					allDayAccessor={false}
					views={['day', 'week', 'month', 'agenda']}
					resizable={calendarAdminPanel !== 'month' ? true : false}
					startAccessor="start"
					endAccessor="end"
					eventPropGetter={_ => {
						return {
							style: {
								backgroundColor: calendarAdminPanel !== 'agenda' && '#94795C',
								border: calendarAdminPanel !== 'agenda' && '#94795C',
							},
						};
					}}
					selectable={calendarAdminPanel !== 'month' ? true : false}
					longPressThreshold={10}
					onSelectEvent={e => handleSelectEvent(e)}
					onSelectSlot={handleSelectSlot}
					messages={messages}
					localizer={localizer}
					date={defaultDate}
					culture={i18n.language}
					events={allEvents}
					defaultView="day"
					onNavigate={onNavigate}
					onEventResize={resizeEvent}
					onEventDrop={moveEvent}
					step={30}
					onView={onPanelChange}
					popup
					slotPropGetter={slotPropGetter}
				/>
			</section>
		</ConfigProvider>
	);
};
