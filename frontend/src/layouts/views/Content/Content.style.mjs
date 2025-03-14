import styled from 'styled-components';

export const ContentContainer = styled.main`
	width: 100dvw;
	max-width: 100%;
	background-image: linear-gradient(
		360deg,
		var(--primary-100) 0%,
		var(--white-700) 30%,
		var(--white-700) 100%
	);
	position: relative;
	z-index: 1;
	margin-bottom: 15px;
	padding-block: 15px;
`;
