import { css } from 'styled-components';

import { colorVars } from './color.style.mjs';

const color = css`
	${colorVars}
`;

export const variable = css`
	:root {
		${color}
	}
`;
