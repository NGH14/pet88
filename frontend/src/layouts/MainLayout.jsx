import { Layout } from 'antd';
import FooterWave from 'components/Footer';
import AppHeader from 'components/Navbar/';
import SubNavBar from 'components/views/SubHeader';

const { Header, Content, Footer } = Layout;
export default function MainLayout({ children }) {
  return (
    <>
      <Layout className="mainLayout" id="top">
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
