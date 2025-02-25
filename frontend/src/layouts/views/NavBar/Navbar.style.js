import { css, styled } from 'styled-components';

export const StyledNavBar = styled.nav`
	width: 100%;
	margin-block: 1em;
	margin-inline: auto;
	padding: 0.5em 30px;
	font-size: 1.2rem;
	display: flex;
	justify-content: space-between;
	align-items: center;
	gap: 0.5em;

	color: var(--black-700);
	text-transform: capitalize;


	${props =>
		props.isFixed &&
		css`
			position: fixed;
			top: 0;
			z-index: 10;
			margin-block: 1em;
		`}
`;

export const NavBarList = styled.section`
width: fit-content;
background-color: var(--white-700);
border-radius: 30px;
padding: 1em 2em;
`