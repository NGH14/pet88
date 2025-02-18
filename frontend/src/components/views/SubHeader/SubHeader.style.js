import styled from 'styled-components';

const Header = styled.nav`
  width: 100%;
`;

export const StyledSubHeader = styled(Header)`
  font-size: 1em;
  padding-inline: 10px;
  display: flex;
  justify-content: flex-end;
  align-items: center;
`;

// CusNavBar.defaultProps = {
// 	theme: {
// 		main: "red",
// 	}
// }
