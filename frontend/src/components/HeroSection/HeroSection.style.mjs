import heroImg from 'assets/images/hero_1.jpg';
import heroImg2 from 'assets/images/hero_2.jpg';
import StartSVG from 'assets/svg/star.svg';
import { styled } from 'styled-components';

export const HeroBlockStyled = styled.section`
	--margin-inline: 3rem;
	--radius: 30% 30% 20px 20px;

	max-height: 55rem;
	width: calc(100% - 2 * var(--margin-inline));
	margin-inline: var(--margin-inline);
	margin-block: -15px 12em;

	position: relative;
	z-index: 1;

	background:
		linear-gradient(to left, rgba(0, 0, 0, 0.3), rgba(0, 0, 0, 0.1)),
		url(${heroImg}) no-repeat;
	background-position: 50% 50%;
	background-size: cover;
	border-radius: var(--radius);

	aspect-ratio: 16 / 9;
	font-size: 1rem;

	@media only screen and (max-width: 625px) {
		max-height: 15rem;
		width: 100%;
		--margin-inline: 0rem;
		/* background: linear-gradient(rgba(0, 0, 0, 0.6), rgba(0, 0, 0, 0.2)), no-repeat; */
	}
`;

export const TextContainer = styled.section`
	color: var(--gray-500);

	position: absolute;
	bottom: 0px;
	right: 0px;
	z-index: 1;
	padding: 1em 2em;
	font-size: 1rem;

	p {
		font-size: 1.5em;
		display: inline-block;
		font-weight: 500;
	}
`;

export const RatingSection = styled.section`
	--rating: ${props => props.$rate};
	--percent: calc(var(--rating) / 5 * 100%);

	font-family: 'Quicksand', sans-serif;
	display: flex;
	flex-direction: row;
	align-items: center;
	gap: 0.2em;
	color: var(--gold-color);
	font-size: 3em;

	p {
		font-weight: 900;
		font-size: 1em;
	}



	&::after {
		content: "★★★★★";
		color:: var(--gold-color);
		background-image: linear-gradient(
			90deg,
			var(--gold-color) var(--percent),
			#fff calc(100% - var(--percent)))
		;
		background-clip: text;
		letter-spacing: 3px;
		font-size: 0.8em;
		color: transparent;
		position: relative;
	}
`;

export const FormContainer = styled.section`
	position: absolute;
	z-index: 3;
	left: 50%;
	bottom: 0px;
	transform: translate(-50%, 50%);
`;
