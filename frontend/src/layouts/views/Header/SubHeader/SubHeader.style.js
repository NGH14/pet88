import styled from 'styled-components';

const SubHeader = styled.nav`
	background-color: var(--gray-100);
	width: 100%;
`;

export const StyledSubHeader = styled(SubHeader)`
	font-size: 1em;
	padding-inline: 0.5em;
	margin-inline: auto;
	display: flex;
	justify-content: space-between;
	align-items: center;

	@media only screen and (max-width: 768px) {
		display: none;
	}
`;
