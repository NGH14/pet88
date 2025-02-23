import { Layout } from 'antd';
import Content from 'layouts/views/Content/Content.jsx';
import Footer from 'layouts/views/Footer/Footer.jsx';
import SubNavBar from 'layouts/views/Header/SubHeader/SubHeader.jsx';
import AppHeader from 'layouts/views/Navbar/';

import Header from './views/Header/Header.jsx';

export default function MainLayout({ children }) {
	return (
		<>
			<Header>
				<SubNavBar />
				<AppHeader />
			</Header>
			<Content>{children}</Content>
			<Footer></Footer>
		</>
	);
}
