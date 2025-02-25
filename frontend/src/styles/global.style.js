import * as styled from 'styled-components';
import 'styles/font.css';

import { reset } from './reset.style.js';
import { variable } from './variable.style.js';

export const GlobalStyle = styled.createGlobalStyle`
	${reset}
	${variable}
	:root {
		font-size: 62.5%;
	}
	body {
		font-family: 'Nunito Sans', 'Quicksand', sans-serif;
		overflow: auto;
		max-height: 100dvh;
		width: 100dvw;
		height: 100%;
		caret-color: transparent;
		scroll-behavior: smooth;

		transition-property:
			color,
			background-color,
			border-color,
			text-decoration-color,
			fill,
			stroke,
		transition-timing-function: cubic-bezier(0.4, 0, 0.2, 1);
		transition-duration: 0.3s;
	}

	p {
		font-size: 1.25em;
		line-height: 1.5em;
	}

	textarea {
		padding: 12px;
		resize: none;
		min-height: fit-content;
	}
`;
