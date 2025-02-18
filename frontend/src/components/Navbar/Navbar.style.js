import { styled } from 'styled-components';

export const NavBar = styled.nav`
  width: 100%;
  font-family: 'Quicksand', serif;
  display: flex;
  justify-content: space-evenly;
  align-items: center;
  margin: auto;
  padding-top: 1em;
  gap: 0.5em;

  font-weight: 700;
  color: var(--pure-black);
  text-transform: capitalize;

  border-top-color: var(--pure-white);
  border-top-width: 3px;
  border-top-style: solid;
`;
