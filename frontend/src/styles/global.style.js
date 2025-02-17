import { createGlobalStyle } from 'styled-components';

import {reset} from "./reset.style.js" 
import { color } from "./variable.style.js" 


export const GlobalStyle = createGlobalStyle`
   ${color}
   ${reset}
`;
