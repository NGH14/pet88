import { useEffect } from 'react';

import Lenis from 'lenis';

import Content from './views/Content/Content.jsx';
import Footer from './views/Footer/Footer.jsx';
import Header from './views/Header/Header.jsx';
import SubHeader from './views/Header/SubHeader/SubHeader.jsx';
import NavBar from './views/NavBar/NavBar.jsx';

export default function MainLayout({ children }) {
	useEffect(() => {
		const lenis = new Lenis();

		function raf(time) {
			lenis.raf(time);

			requestAnimationFrame(raf);
		}
		requestAnimationFrame(raf);
	}, []);
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
