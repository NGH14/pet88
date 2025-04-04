import React, { useState } from 'react';
import { useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { AiOutlineClose } from 'react-icons/ai';
import { useNavigate } from 'react-router';
import { toast } from 'react-toastify';

import {
	DeleteOutlined,
	EditOutlined,
	FileExcelOutlined,
	MoreOutlined,
	ReloadOutlined,
	SearchOutlined,
} from '@ant-design/icons';
import { ExportTableButton, SearchTableInput, Table } from 'ant-table-extensions';
import {
	Button,
	DatePicker,
	Drawer,
	Form,
	Input,
	InputNumber,
	Modal,
	Popconfirm,
	Select,
	Space,
	Tag,
	Upload,
	message,
} from 'antd';
import axios from 'axios';
import moment from 'moment';

// import { UserAuth } from '../../context/AuthContext';
// import { storage } from '../../utils/firebase';
import './style.css';

const { Option } = Select;

const getBase64 = file =>
	new Promise((resolve, reject) => {
		const reader = new FileReader();
		reader.readAsDataURL(file);
		reader.onload = () => resolve(reader.result);
		reader.onerror = error => reject(error);
	});

const { Dragger } = Upload;

export default function TableRooms() {
	const [tableLoading, setTableLoading] = React.useState(true);
	const [roomRecord, setRoomRecord] = React.useState({});
	const [loadingCreate, setLoadingCreate] = React.useState(false);
	const [loading, setLoading] = React.useState(false);
	const [listRoomCategorys, setListRoomCategorys] = React.useState();
	const [size, setSize] = useState('large');
	const [openUpdate, setOpenUpdate] = useState(false);
	const [openCreate, setOpenCreate] = useState(false);
	const [tableToolTip, setTableToolTip] = useState(false);

	const [form] = Form.useForm();
	// const { token } = UserAuth();
	const [searchDataSource, setSearchDataSource] = React.useState(listRoomCategorys);
	const { t, i18n } = useTranslation();
	const [page, setPage] = React.useState(1);

	const [previewOpen, setPreviewOpen] = React.useState(false);
	const [previewImage, setPreviewImage] = React.useState('');
	const [previewTitle, setPreviewTitle] = React.useState('');
	const [fileList, setFileList] = React.useState([]);
	const [hotelData, setHotelData] = React.useState([]);

	const [resetUpload, setResetUpload] = React.useState(true);
	const [showFile, setShowFile] = React.useState(true);
	const [uploading, setUploading] = React.useState(false);
	const [selectedRowKeys, setSelectedRowKeys] = React.useState([]);

	const [openModal, setOpenModal] = useState(false);
	const [confirmLoadingModal, setConfirmLoadingModal] = useState(false);

	const fullWidth = global.window.innerWidth;

	const GetAllRoomCategory = async () => {
		try {
			const res = await axios.get(`http://localhost:3001/api/hotel-room`);
			return res.data;
		} catch (error) {
			return console.error(error);
		}
	};

	const GetAllHotel = async () => {
		try {
			const res = await axios.get(`http://localhost:3001/api/hotel`);
			return res.data;
		} catch (error) {
			return console.error(error);
		}
	};

	const showModal = () => {
		setOpenModal(true);
	};
	const handleOkModal = async () => {
		setConfirmLoadingModal(true);
		setSelectedRowKeys([]);
		await handleDeleteMultipleRoomCategory();

		setOpenModal(false);
	};
	const handleCancelModal = () => {
		setOpenModal(false);
	};

	const handleCancel = () => setPreviewOpen(false);

	useEffect(() => {
		getAllRoomCategoryData();
		getAllHotelData();
	}, []);

	const handleOpenUpdateCategory = record => {
		setRoomRecord(record);
		setOpenUpdate(true);
	};

	const handleOpenCreateRoom = async () => {
		setOpenCreate(true);
	};

	const onFinishUpdate = async value => {
		setLoading(true);
		try {
			const roomNumbers = value.roomNumbers.map(room => ({
				number: room,
			}));

			const data = {
				...value,
				roomNumbers,
			};

			await axios.put(`http://localhost:3001/api/hotel-room/${roomRecord._id}`, data);

			setLoading(false);
			toast.success(t('Update Room Success'));
			setOpenUpdate(false);
			getAllRoomCategoryData();
		} catch (e) {
			toast.error(t('Something went wrong! please try again'));
			setLoading(false);
		}
	};
	useEffect(() => form.resetFields(), [roomRecord, openCreate]);

	const onCloseUpdateRoom = () => {
		setRoomRecord({});
		setOpenUpdate(false);
	};

	const onCloseCreateUser = () => {
		setOpenCreate(false);
	};

	const handleDeleteRoomCategory = async id => {
		try {
			const res = await axios.delete(`http://localhost:3001/api/hotel-room/${id}`, {});

			setListRoomCategorys(listRoomCategorys.filter(item => item._id !== id));
			setSearchDataSource(searchDataSource.filter(item => item._id !== id));
			toast.success(t('Delete Success'));

			return res.data;
		} catch (error) {
			return console.error(error);
		}
	};

	const onFinishCreateRoomCategory = async value => {
		setLoadingCreate(true);
		try {
			const departmentID = value.department;

			delete value.department;
			const roomNumbers = value.roomNumbers.map(room => ({
				number: room,
			}));

			const data = {
				...value,
				hotelID: departmentID,
				roomNumbers,
			};

			await axios.post(`http://localhost:3001/api/hotel-room/${departmentID}`, data);

			console.log({ data, departmentID });

			setLoadingCreate(false);
			setOpenCreate(false);
			getAllRoomCategoryData();
			toast.success(t('Created Room'));
		} catch (e) {
			console.log(e.message);
			setLoadingCreate(false);
		}
	};

	const onFinishFailed = errorInfo => {
		console.log('Failed:', errorInfo);
	};

	const onSelectChange = newSelectedRowKeys => {
		setSelectedRowKeys(newSelectedRowKeys);
	};
	const rowSelection = {
		selectedRowKeys,
		onChange: onSelectChange,
	};

	const columns = [
		{
			title: t('Name'),
			dataIndex: 'title',
			key: 'title',
		},

		{
			title: t('Type'),
			dataIndex: 'type',
			key: 'type',
			render: text => <span>{t(text)}</span>,
		},
		{
			title: t('Price'),
			dataIndex: 'price',
			key: 'price',
			render: text => (
				<span>
					{' '}
					{new Intl.NumberFormat('vi_VN', {
						style: 'currency',
						currency: 'VND',
					}).format(text)}
				</span>
			),

			sorter: (a, b) => a.price - b.price,
		},
		{
			title: t('In Hotel'),
			dataIndex: 'Hotel',
			key: 'hotelID',
			render: (_, record) => (
				<span>{hotelData.find(hotel => hotel._id === record.hotelID)?.name}</span>
			),
		},

		{
			width: 110,
			title: t('Action'),
			fixed: 'right',
			key: 'action',
			render: (_, record) => (
				<Space size="middle">
					<Popconfirm
						key="delete"
						title={t('Are you sure to delete?')}
						onConfirm={() => handleDeleteRoomCategory(record._id)}
					>
						<Button danger type="text" icon={<DeleteOutlined />}></Button>
					</Popconfirm>
					<Button
						type="text"
						key="update"
						icon={<EditOutlined />}
						onClick={() => handleOpenUpdateCategory(record)}
					></Button>
				</Space>
			),
		},
	];

	const handleDeleteMultipleRoomCategory = async () => {
		try {
			await axios.patch(`http://localhost:3001/api/hotel-room/multiple-delete`, selectedRowKeys);
			setListRoomCategorys(listRoomCategorys.filter(item => !selectedRowKeys.includes(item._id)));
			setSearchDataSource(searchDataSource.filter(item => !selectedRowKeys.includes(item._id)));

			toast.success(t('Delete Success'));
		} catch (error) {
			console.log(error);
		}
	};
	const getAllRoomCategoryData = async () => {
		setTableLoading(true);
		try {
			const res = await GetAllRoomCategory();
			const list = [];
			res.forEach(doc => {
				list.push({ ...doc, key: doc._id });
			});
			setListRoomCategorys(list);
			setSearchDataSource(list);

			setTableLoading(false);
		} catch (error) {
			console.error(error);
			setTableLoading(false);
		}
	};

	const getAllHotelData = async () => {
		try {
			const res = await GetAllHotel();
			const list = [];
			res.forEach(doc => {
				list.push({ ...doc, key: doc._id });
			});
			setHotelData(list);
		} catch (error) {
			console.error(error);
		}
	};

	const expandedRowRender = record => {
		const subColumns = [
			{
				title: 'ID',
				dataIndex: '_id',
				key: '_id',
			},
			{
				title: t('Room Number'),
				dataIndex: 'number',
				key: 'number',
			},
		];
		return (
			<>
				<Table columns={subColumns} dataSource={record.roomNumbers} pagination={false} />
				<p
					style={{
						margin: 15,
					}}
				>
					{t('Created Date')}
					{t(': ')}
					{new Date(record.createdAt).toLocaleString()}
				</p>
				<p
					style={{
						margin: 15,
					}}
				>
					{t('Last Update Date')}
					{t(': ')}
					{new Date(record.updatedAt).toLocaleString()}
				</p>
			</>
		);
	};

	return (
		<>
			<section className="tableroom-header">
				<section className="tableroom_leftheader">
					<h2 className="tableroom-header-title">{t('management hotel service')}</h2>
					<Button
						icon={<MoreOutlined style={{ fontSize: 20 }} />}
						onClick={() => setTableToolTip(!tableToolTip)}
						type="text"
					></Button>
				</section>
				<section className="tableroom_rightheader">
					<SearchTableInput
						columns={columns}
						dataSource={listRoomCategorys}
						setDataSource={setSearchDataSource}
						inputProps={{
							placeholder: t('Search'),
							prefix: <SearchOutlined />,
						}}
					/>
					<Button
						className="tableroom_createbutton"
						loading={loadingCreate}
						type="primary"
						onClick={handleOpenCreateRoom}
					>
						{t('Create new')}
					</Button>
					<Button
						icon={<ReloadOutlined rotate={50} style={{ fontSize: 14 }} />}
						onClick={() => getAllRoomCategoryData()}
						type="text"
					></Button>
				</section>
			</section>

			<Drawer
				title={t('Update')}
				width={fullWidth >= 1000 ? '878px' : fullWidth}
				onClose={onCloseUpdateRoom}
				open={openUpdate}
				bodyStyle={{
					paddingBottom: 80,
				}}
			>
				{openUpdate ? (
					<Form
						form={form}
						validateTrigger="onBlur"
						labelCol={{ span: 4 }}
						name="update room"
						size={'large'}
						initialValues={{
							type: roomRecord?.type,
							price: roomRecord?.price,
							title: roomRecord?.title,
							maxPet: roomRecord.maxPet,
							desc: roomRecord?.desc,
							roomNumbers: roomRecord?.roomNumbers?.map(object => object['number']),
						}}
						onFinish={onFinishUpdate}
						onFinishFailed={onFinishFailed}
						autoComplete="off"
						requiredMark={false}
					>
						<Form.Item label={t('Title')} name="title">
							<Input />
						</Form.Item>
						<Form.Item name="type" label={t('Type')}>
							<Select>
								<Option value="dogandcat">{t('Dog and Cat')}</Option>
								<Option value="reptile ">{t('Reptile ')}</Option>
							</Select>
						</Form.Item>
						<Form.Item label={t('Price')} name="price">
							<InputNumber
								formatter={value => `${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ',')}
								prefix={'₫'}
								style={{ width: '100%' }}
							/>
						</Form.Item>
						<Form.Item label={t('Describe')} name="desc">
							<Input />
						</Form.Item>
						<Form.Item label={t('Max Pet')} name="maxPet">
							<InputNumber style={{ width: '100%' }} />
						</Form.Item>
						<Form.Item name="roomNumbers" label={t('Room Number')}>
							<Select mode="tags" />
						</Form.Item>
						<Form.Item
							wrapperCol={{
								offset: 4,
								span: 16,
							}}
						>
							<Button
								style={{
									marginInline: 15,
									height: 'fit-content',
									fontSize: 16,
									lineHeight: 1.8,
									borderRadius: 5,
									boxShadow: 'rgb(0 0 0 / 25%) 0px 2px 4px 0px',
								}}
								onClick={onCloseUpdateRoom}
							>
								{t('Close')}
							</Button>
							<Button
								loading={loadingCreate}
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
				) : null}
			</Drawer>

			<Drawer
				title={t('Create Room Category')}
				width={fullWidth >= 1000 ? '878px' : fullWidth}
				onClose={onCloseCreateUser}
				open={openCreate}
				bodyStyle={{
					paddingBottom: 80,
				}}
			>
				{openCreate ? (
					<Form
						form={form}
						validateTrigger="onBlur"
						labelCol={{ span: 4 }}
						name="Create RoomCategory"
						size={'medium'}
						initialValues={{}}
						onFinish={onFinishCreateRoomCategory}
						onFinishFailed={onFinishFailed}
						autoComplete="off"
						requiredMark={false}
					>
						<Form.Item name="department" label={t('Department')}>
							<Select>
								{hotelData.map(data => (
									<Select.Option value={data?._id}>{data?.name}</Select.Option>
								))}
							</Select>
						</Form.Item>
						<Form.Item label={t('Title')} name="title">
							<Input />
						</Form.Item>
						<Form.Item name="type" label={t('Type')}>
							<Select>
								<Option value="dogandcat">{t('Dog and Cat')}</Option>
								<Option value="reptile ">{t('Reptile ')}</Option>
							</Select>
						</Form.Item>
						<Form.Item label={t('Price')} name="price">
							<InputNumber
								formatter={value => `${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ',')}
								prefix={'₫'}
								style={{ width: '100%' }}
							/>
						</Form.Item>
						<Form.Item label={t('Describe')} name="desc">
							<Input />
						</Form.Item>
						<Form.Item label={t('Max Pet')} name="maxPet">
							<InputNumber style={{ width: '100%' }} />
						</Form.Item>
						<Form.Item name="roomNumbers" label={t('Room Number')}>
							<Select mode="tags" />
						</Form.Item>
						<Form.Item
							wrapperCol={{
								offset: 4,
								span: 16,
							}}
						>
							<Button
								style={{
									marginInline: 15,
									height: 'fit-content',
									fontSize: 16,
									lineHeight: 1.8,
									borderRadius: 5,
									boxShadow: 'rgb(0 0 0 / 25%) 0px 2px 4px 0px',
								}}
								onClick={onCloseCreateUser}
							>
								{t('Close')}
							</Button>
							<Button
								loading={loadingCreate}
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
				) : null}
			</Drawer>
			<Modal open={previewOpen} title={previewTitle} footer={null} onCancel={handleCancel}>
				<img
					alt="example"
					style={{
						width: '100%',
					}}
					src={previewImage}
				/>
			</Modal>
			{tableToolTip ? (
				<section className="table_tooltip">
					<Select
						bordered={false}
						defaultValue="large"
						style={{
							width: 100,
						}}
						onChange={setSize}
					>
						<Option value="small"> {t('Small')}</Option>
						<Option value="middle">{t('Medium')}</Option>
						<Option value="large">{t('Large')}</Option>
					</Select>

					<ExportTableButton
						dataSource={listRoomCategorys}
						columns={columns}
						btnProps={{
							type: 'primary',
							icon: <FileExcelOutlined />,
						}}
						showColumnPicker
					>
						{t('Export')}
					</ExportTableButton>
				</section>
			) : null}

			<Modal
				width={400}
				closable={false}
				footer={null}
				open={openModal}
				confirmLoading={confirmLoadingModal}
			>
				<section>
					<h6 style={{ fontWeight: 700, fontSize: 16 }}>
						{t('Delete')} {selectedRowKeys.length} {t('room')} {t('selected')}?
					</h6>
					<p style={{ fontWeight: 500, fontSize: 14 }}>
						{t('This will permanently remove')} {t('room')}
					</p>
					<section
						style={{
							marginTop: 20,

							display: 'flex',
							gap: 5,
							justifyContent: 'flex-end',
						}}
					>
						<Button onClick={handleCancelModal} style={{ borderRadius: 8 }}>
							{t('Cancel')}
						</Button>
						<Button onClick={handleOkModal} style={{ borderRadius: 8 }} type="primary" danger>
							{t('Delete')}
						</Button>
					</section>
				</section>
			</Modal>
			{selectedRowKeys.length > 0 ? (
				<section className="table_deletemulpti">
					<span className="table_deletemulpti-span">
						{selectedRowKeys.length} {t('selected')} |
					</span>
					<Button
						type="text"
						onClick={() => setSelectedRowKeys([])}
						className="table_deletemulpti-deselect"
					>
						{t('Deselect')}
					</Button>
					<Button
						danger
						style={{
							display: 'flex',
							alignItems: 'center',
							justifyContent: 'center',
						}}
						icon={<AiOutlineClose color="red" style={{ marginRight: 5 }} />}
						onClick={() => showModal()}
						className="table_deletemulpti-delete"
					>
						{t('Delete')}
					</Button>
				</section>
			) : null}
			<Table
				rowKey={record => record.key}
				rowSelection={rowSelection}
				size={size}
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
				expandable={{
					expandedRowRender: record => expandedRowRender(record),
				}}
				pagination={{
					hideOnSinglePage: true,
					showTotal: (total, range) => `${range[0]}-${range[1]} of ${total} items`,
					defaultPageSize: 5,
					showSizeChanger: true,
					pageSizeOptions: ['5', '10', '20', '30'],
				}}
				columns={columns}
				dataSource={searchDataSource || listRoomCategorys}
				loading={tableLoading}
			/>
		</>
	);
}
