import { useEffect } from 'react';

import Lenis from 'lenis';

import { ContentContainer } from './Content.style.mjs';

export default function Content({ children }) {
	useEffect(() => {
		const lenis = new Lenis();

		function raf(time) {
			lenis.raf(time);

			requestAnimationFrame(raf);
		}
		requestAnimationFrame(raf);
	}, []);
	return <ContentContainer>{children}</ContentContainer>;
}
