import StartSVG from 'assets/svg/star.svg';
import { styled } from 'styled-components';

export const TextContainer = styled.section`
	color: var(--gray-500);
	position: absolute;
	bottom: 10px;
	right: 10px;
	z-index: 1;

	p {
		font-size: 1em;
		display: inline-block;
		font-weight: 500;
	}
`;

export const RatingSection = styled.section`
	font-family: 'Quicksand', sans-serif;
	display: flex;
	flex-direction: row;
	align-items: center;
	gap: 0.2em;
	color: var(--gold-color);
	font-size: 2em;

	p {
		font-weight: 700;
		font-size: 1em;
	}

		&::after {
		content: "★★★★★";
		color:: var(--gold-color);
		background: linear-gradient(
			90deg,
			var(--gold-color) 90%,
			#fff 10%
		);
		background-clip: text;
		letter-spacing: 3px;
		font-size: 0.7em;
		color: transparent;
		position: relative;
	}

`;

export const HeroBlockStyled = styled.section`
	background:
		linear-gradient(to top, rgba(0, 0, 0, 0.6), rgba(0, 0, 0, 0.1)),
		url(http://morkie.qodeinteractive.com/wp-content/uploads/2023/09/rev-home-2-slide-01.jpg)
			no-repeat;
	height: 800px;

	background-size: cover;
	border-radius: 20px;
	margin-inline: 3rem;
	position: relative;
	@media only screen and (max-width: 425px) {
		background: linear-gradient(rgba(0, 0, 0, 0.6), rgba(0, 0, 0, 0.2)), no-repeat;
	}
`;
