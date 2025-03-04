import { useEffect } from 'react';

import Content from './views/Content/Content.jsx';
import Footer from './views/Footer/Footer.jsx';
import Header from './views/Header/Header.jsx';
import SubHeader from './views/Header/SubHeader/SubHeader.jsx';
import NavBar from './views/NavBar/NavBar.jsx';

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
