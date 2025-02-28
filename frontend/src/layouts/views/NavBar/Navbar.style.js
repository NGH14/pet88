import { css, styled } from 'styled-components';

export const NavBarList = styled.section`
	width: fit-content;
	background-color: var(--white-700);
	padding: 1em 2em;
	position: relative;
	transition-property: all;
	transition-timing-function: cubic-bezier(0.4, 0, 0.2, 1);
	transition-duration: 0.2s;
`;

export const StyledNavBar = styled.nav`
	width: 100%;
	margin-block: 1em;
	margin-inline: auto;
	padding: 0.5em 20px;
	font-size: 1.2rem;
	display: flex;
	justify-content: space-between;
	align-items: center;
	gap: 0.5em;
	z-index: 10;

	color: var(--black-700);
	text-transform: capitalize;

	${props =>
		props.scrolled
			? css`
					position: fixed;
					top: 0;
					z-index: 10;
					${NavBarList} {
						border-radius: 30px;
						color: red;
					}
				`
			: css`
					position: relative;

					${NavBarList} {
						border-radius: 0 0 20px 20px;
					&:after {
						content: '';
						position: absolute;
						top: 0px;
						height: 50px;
						right: -25px;
						width: 25px;
						border-top-left-radius: 25px;
						box-shadow: 0 -25px 0 0 #fafafa;
						z-index: 2;
					}

					&:before {
						content: '';
						position: absolute;
						top: 0px;
						height: 50px;
						left: -25px;
						width: 25px;
						border-top-right-radius: 25px;
						box-shadow: 0 -25px 0 0 #fafafa;
					}
				`}
`;
