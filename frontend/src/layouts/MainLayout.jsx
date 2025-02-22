import { Layout } from 'antd';
import FooterWave from 'layouts/views/Footer/Footer.jsx';
import AppHeader from 'components/Navbar/';
import SubNavBar from 'layouts/views/SubHeader/SubHeader.jsx';

const { Header, Content, Footer } = Layout;
export default function MainLayout({ children }) {
	return (
		<>
			<Layout className="mainLayout">
				<Header>
					<SubNavBar></SubNavBar>
					<AppHeader></AppHeader>
				</Header>
				<Content>{children}</Content>
				<Footer>
					<FooterWave></FooterWave>
				</Footer>
			</Layout>
		</>
	);
}
