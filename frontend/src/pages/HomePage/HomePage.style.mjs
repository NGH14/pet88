import { styled } from 'styled-components';

export const ColoredBackGround = styled.section`
	background-color: ${props => props.$bgColor ?  : 'color-mix(in hsl, var(--primary-200) 20%,transparent)'};
	padding: 2em 1em;
	border-radius: 45px;
	margin: 1.5em calc(-1 * var(--global-margin)) 0;
`;
