import styled from 'styled-components';

const Header = styled.nav`
	background-color: var(--gray-100);
	width: 100%;
`;

export const StyledSubHeader = styled(Header)`
	font-size: 1em;
	padding-inline: 50px;
	display: flex;
	justify-content: space-between;
	align-items: center;

	@media only screen and (max-width: 768px) {
		display: none;
	}
`;


