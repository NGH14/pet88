import { css } from 'styled-components';
import { ExtractCSSColorVar } from 'utils/extractCSSColorVar.mjs';

export const color = css`
	${() => ExtractCSSColorVar()}
`;

export const variable = css`
	:root {
		${color}
	}
`;
