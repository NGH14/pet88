import { css, styled } from 'styled-components';

export const NavBarList = styled.section`
	width: fit-content;
	background-color: var(--white-700);
	padding: 1em 2em;
	border-radius: 25px;
	position: relative;
`;

export const StyledNavBar = styled.nav`
	width: 100%;
	margin: auto;
	padding: 0.5em 20px;
	font-size: 1.2rem;
	display: flex;
	justify-content: space-between;

	align-items: center;
	gap: 0.5em;
	z-index: 10;
	color: var(--black-700);
	text-transform: capitalize;
	position: fixed;
`;
