import styled from 'styled-components';

export const StyledOperatingStatus = styled.section`
	display: flex;
	justify-content: center;
	align-items: center;
	gap: 10px;
	padding-inline: 10px;
	font-size: 12px;
	font-weight: 500;
	text-transform: capitalize;
	color: var(--black-700);
	border: 1px solid var(--gray-500);
	border-radius: 15px;
`;

export const Cirle = styled.div`
	width: 10px;
	height: 10px;

	border-radius: 50%;
`;

export const OpenCircle = styled(Cirle)`
	background-color: var(--green-300);
	position: relative;

	&::after {
		content: '';
		width: 100%;
		height: 100%;
		background-color: inherit;
		border-radius: inherit;
		transform: scale(1);

		position: absolute;
		animation: loading_circle 1.5s forwards infinite linear;
	}

	@keyframes loading_circle {
		100% {
			transform: scale(2);
			opacity: 0;
		}
	}
`;
