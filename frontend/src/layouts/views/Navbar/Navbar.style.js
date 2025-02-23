import { styled } from 'styled-components';

export const NavBar = styled.nav`
	width: 100%;
	padding: 0.5em 50px;

	display: flex;
	justify-content: space-between;
	align-items: center;
	margin: auto;
	gap: 0.5em;

	color: var(--pure-black);
	text-transform: capitalize;

	border-top-color: var(--pure-white);
	border-top-width: 3px;
	border-top-style: solid;
`;
