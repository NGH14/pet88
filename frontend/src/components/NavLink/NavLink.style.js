import { NavLink } from 'react-router';

import styled from 'styled-components';

export const NavbarContainer = styled.nav`
  width: 100%;
  height: 50px;
  display: flex;
  flex-direction: column;
`;

export const StyledNavLink = styled(NavLink)`
  color: #171111;
  font-family: 'Nunito Sans', 'Quicksand', sans-serif;

  font-weight: 900;
  text-decoration: none;
  margin: 10px;
  font-size: 1.5em;
  &:hover,
  &:focus,
  &:active {
    color: var(--primary-color) !important;
  }
`;
