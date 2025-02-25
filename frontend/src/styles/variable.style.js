import { ExtractCSSColorVar } from 'configs/theme.config.mjs';
import * as styled from 'styled-components';

export const color = styled.css`
	${() => ExtractCSSColorVar()}
`;

export const variable = styled.css`
	:root {
		${color}
	}
`;
