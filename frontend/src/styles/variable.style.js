import { ExtractCSSColorVar } from 'configs/theme.config.mjs';
import { css } from 'styled-components';

export const color = css`
	${() => ExtractCSSColorVar()}
`;

export const variable = css`
	:root {
		${color}
	}
`;
