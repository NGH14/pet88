import { Layout } from 'antd';
import Content from 'layouts/views/Content/Content.jsx';
import Footer from 'layouts/views/Footer/Footer.jsx';
import SubHeader from 'layouts/views/Header/SubHeader/SubHeader.jsx';
import NavBar from 'layouts/views/NavBar/NavBar.jsx';

import Header from './views/Header/Header.jsx';

export default function MainLayout({ children }) {
	return (
		<>
			<Header>
				<SubHeader />
				<NavBar />
			</Header>
			<Content>{children}</Content>
			<Footer></Footer>
		</>
	);
}
