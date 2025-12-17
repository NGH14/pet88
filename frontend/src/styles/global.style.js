import 'assets/fonts/font.css';
import * as styled from 'styled-components';

import { reset } from './reset.style.js';
import { variable } from './variable.style.js';

export const GlobalStyle = styled.createGlobalStyle`
	${reset}
	${variable}
	:root {
		font-size: 62.5%;
	}
	html {
		width: 100lvw;
		height: 100lvh;
		scroll-behavior: smooth;
		scroll-padding-top: 80px;
	}

	body {
		font-family: 'Nunito Sans', 'Quicksand', sans-serif;
		overflow: auto;
		width: 100%;
		height: 100%;
		caret-color: transparent;
		background-color: (--white-500);
	}

	p {
		font-size: 1.2em;
		line-height: 1.5em;
	}

	textarea {
		padding: 12px;
		resize: none;
		min-height: fit-content;
	}

	.mobileVisible {
		display: none;
	}
`;

