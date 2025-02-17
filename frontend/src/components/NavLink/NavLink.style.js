import { NavLink } from 'react-router';
import styled from 'styled-components';

export const NavbarContainer = styled.nav`
	width: 100%;
	height: 50px;
	background-color: purple;
	display: flex;
	flex-direction: column;
`;

export const NavbarLinkContainer = styled.section`
	display: flex;
`;
export const StyledNavLink = styled(NavLink)`
	color: #171111;
	text-decoration: none;
	margin: 10px;
	&:hover,
	&:focus {
		color: blue;
	}
	&:active {
		color: red;
	}
`;
