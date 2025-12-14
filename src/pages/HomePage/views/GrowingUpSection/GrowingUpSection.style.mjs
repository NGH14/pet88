import styled from 'styled-components';

export const GrowUpContainer = styled.section`
	display: flex;
	flex-wrap: wrap;
	justify-content: space-evenly;
	gap: 20px;
	font-size: 1.2em;
	width: 100%;
`;

export const GrowUpElement = styled.section`
	height: max-content;
	width: 30em;
	padding: 2em;
	text-align: center;
	display: flex;
	flex-flow: column wrap;
	justify-content: center;
	align-items: center;

	background-color: var(--white-700);
	border-radius: 35px;
`;

export const GrowUpSubText = styled.p`
	font-size: 1.8em;
	font-weight: 600;
`;
