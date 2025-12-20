import { styled } from 'styled-components';

export const ColoredBackGround = styled.section`
console.log({props});
	background-color: ${props =>
		props.$bgColor
			? `color-mix(in hsl, ${props.$bgColor} 20%,transparent)`
			: 'color-mix(in hsl, var(--white-200) 20%,transparent)'};
	padding: 2em 1em;
	border-radius: 45px;
	margin: 1.5em 0;
`;

export const HomepageStyle = styled.section`
	padding: 2em 1em;
	margin: 1em;
`;