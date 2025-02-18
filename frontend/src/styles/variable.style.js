import { css } from 'styled-components';

export const color = css`
	--primary-color: #f76a1a;
	--pure-black: #171111;
	--pure-white: #f7f6f1;
`;

export const variable = css`
	:root {
		${color}
    
	}
`;