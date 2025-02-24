import { css, styled } from 'styled-components';

export const StyledNavBar = styled.nav`
	width: 100%;
	margin-block: 2em;
	margin-inline: auto;
	padding: 0.5em 50px;

	display: flex;
	justify-content: space-between;
	align-items: center;
	gap: 0.5em;

	color: var(--pure-black);
	text-transform: capitalize;

	border-top-color: var(--pure-white);
	border-top-width: 3px;
	border-top-style: solid;

	${props =>
		props.isFixed &&
		css`
			position: fixed;
			top: 0;
			z-index: 3;
			margin-block: auto;
		`}
`;
