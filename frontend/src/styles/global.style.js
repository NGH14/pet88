import { createGlobalStyle, css } from 'styled-components';

import { reset } from './reset.style.js';
import { variable } from './variable.style.js';

export const GlobalStyle = createGlobalStyle`
   ${reset}
   ${variable}
   body {
   font-family: 'Quicksand', serif;
   overflow: auto;
	max-height: 100dvh;
	width: 100dvw;
   height: 100%;
	caret-color: transparent;
	scroll-behavior: smooth;
	font-size: 62.5%;
   }

   p {
      font-size: 1.25em;
      line-height: 1.5em;
   }
`;
