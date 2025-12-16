import { Fragment,useEffect, useState } from 'react';
import { CSVLink } from 'react-csv';
import { useTranslation } from 'react-i18next';
import { CgUserList } from 'react-icons/cg';
import { MdOutlinePayments } from 'react-icons/md';
import { RiCalendarEventLine, RiCoupon3Line } from 'react-icons/ri';
import { NavLink, useLocation, useNavigate } from 'react-router';
import { toast } from 'react-toastify';
import { IoIosMenu } from "react-icons/io";
import { MenuFoldOutlined, MenuUnfoldOutlined, ReconciliationOutlined } from '@ant-design/icons';
import { Button, ConfigProvider, Space, Table, Tag } from 'antd';
import { Breadcrumb, Layout, Menu } from 'antd';
import logoWhite from '~assets/images/logo/text-logo-white.webp';
import { CalendarAdmin } from '~components/Calendar/CalendarAdmin';
import ChangeLanguageButton from '~components/ChangeLanguageButton/index';
import  Spinner from '~components/Spinner/Spinner.jsx';
import TableGrooming from '~components/TableGrooming/index';
import TableHotel from '~components/TableHotel';
import TableOrder from '~components/TableOrder';
import TableRooms from '~components/TableRooms';
// import TableUser from '~components/TableUser/index';
// import { UserAuth } from 'context/AuthContext';
// import { collection, getDocs } from 'firebase/firestore';
import SubNavBar from '~layouts/views/Header/SubHeader/SubHeader.jsx';

import { UserSVGComponent, DepartmentSVGComponent, OrderSVGComponent, SettingSVGComponent } from '~assets/icons/index.jsx';

import './style.css';

const { Header, Content, Sider } = Layout;

function getItem(label, key, icon, children) {
	return {
		key,
		icon,
		children,
		label,
	};
}



export default function Admin() {
	const location = useLocation();
	const [loading, setLoading] = useState(false);
	const { t, i18n } = useTranslation();
	// const { user } = UserAuth();
	const navigate = useNavigate();
	const [collapsed, setCollapsed] = useState(true);
	const [openUpdate, setOpenUpdate] = useState(false);

	const items = [
		getItem(t('Appointment'), '/admin', <DepartmentSVGComponent size="1.3em" />),
		getItem(t('Business'), 'depart', <ReconciliationOutlined />, [
			getItem(t('Departments'), '/admin/management-hotel'),
			getItem(t('Hotel Service'), '/admin/management-room-category'),
			getItem(t('Grooming Service'), '/admin/management-grooming'),
		]),
		getItem(t('User'), '/admin/management-user', <UserSVGComponent size="1.3em" />),

		getItem(t('Order'), '/admin/management-order', <OrderSVGComponent size="1.3em" />),
		getItem(t('Setting'), '/admin/management-setting', <SettingSVGComponent size="1.3em" />),

		// getItem(<ChangeLanguageButton fullWidth></ChangeLanguageButton>, '', null),
	];

	const handleClickMenu = path => {
		navigate(path);
		setCollapsed(true);
	};

	// useEffect(() => {
	// 	if (!user?.role || user?.role !== 'admin') {
	// 		navigate('/');
	// 	}
	// 	setLoading(false);
	// }, [user]);

	return loading ? (
		<Spinner />
	) : (
		<Fragment>
				<Layout
					style={{
						minHeight: '100vh',
					}}
				>
					<Sider collapsed={collapsed} className={collapsed && 'admin-sitebar'}>
						<Button
						size="middle"
							shape="circle"
							className="trigger_admin-sitebar"
							onClick={() => setCollapsed(!collapsed)}
							icon={collapsed ? <IoIosMenu /> : <MenuFoldOutlined />}
						>
						</Button>
						<Menu
							onClick={({ key }) => handleClickMenu(key)}
							theme="light"
							defaultSelectedKeys={['/admin']}
							mode="inline"
							items={items}
						/>
					</Sider>
					<Layout className="adminsite-layout">
						<Header
							className="adminsite-layout-background"
							style={{
								display: 'flex',
								justifyContent: 'space-between',
								padding: 0,
								margin: 'auto',
							}}
						>

							<SubNavBar />
						</Header>
						<Content
							style={{
								backgroundColor: 'var(--gray-100)',
							}}
						>
							<section
								className="site-layout-background"
								style={{
									padding: 24,
									minHeight: 360,
								}}
							>

								{(() => {
									switch (location.pathname) {
										case '/admin':
											return <CalendarAdmin />;
										case '/admin/management-user':
											return <TableUser />;
										case '/admin/management-hotel':
											return <TableHotel />;
										case '/admin/management-room-category':
											return <TableRooms />;
										case '/admin/management-grooming':
											return <TableGrooming />;
										case '/admin/management-order':
											return <TableOrder />;
										default:
											return null;
									}
								})()}
							</section>
						</Content>
					</Layout>
				</Layout>

		</Fragment>
	);
}
