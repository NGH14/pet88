import styled from 'styled-components';

const SubHeader = styled.nav`
	background-color: var(--white-700);
	width: 100%;
`;

export const StyledSubHeader = styled(SubHeader)`
	font-size: 0.75em;
	padding-inline: 30px;
	margin-inline: auto;
	display: flex;
	justify-content: space-between;
	align-items: center;
	@media only screen and (max-width: 768px) {
		display: none;
	}
`;
