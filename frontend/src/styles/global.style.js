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
