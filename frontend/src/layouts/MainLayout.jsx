import { Layout } from 'antd';
import AppHeader from 'components/Navbar/';
import SubNavBar from 'components/SubHeader';
import FooterWave from 'components/Footer/index';

const { Header, Content, Footer } = Layout;
export default function MainLayout({children}) {
 return (
		<>
			<Layout className='mainLayout' id='top'>
				<Header>
					<SubNavBar></SubNavBar>
					<AppHeader></AppHeader>
				</Header>{' '}
				<Content>${children}</Content>
				<Footer>
					<FooterWave></FooterWave>
				</Footer>
			</Layout>
		</>
 );
}