import heroImg from 'assets/images/hero_1.jpg';
import heroImg2 from 'assets/images/hero_2.jpg';
import StartSVG from 'assets/svg/star.svg';
import { styled } from 'styled-components';

export const HeroBlockStyled = styled.section`
	--margin-inline: 2rem;
	--radius: 28% 28% 20px 20px;
	--inner-curve: 20px;
	--x: 12px; /* horizontal offset (no percentage) */
	--y: 16px; /* vertical offset (no percentage) */
	--_m: /calc(2 * var(--radius)) calc(2 * var(--radius)) radial-gradient(#000 70%, #0000 72%);
	--_g: conic-gradient(at var(--radius) var(--radius), #000 75%, #0000 0);
	--_d: (var(--inner-curve) + var(--radius));

	max-height: 55rem;
	width: calc(100% - 2 * var(--margin-inline));
	margin-inline: var(--margin-inline);
	margin-block: -6.35em 120px;

	position: relative;
	z-index: 1;

	background:
		linear-gradient(to top, rgba(0, 0, 0, 0.3), rgba(0, 0, 0, 0.1)),
		url(${heroImg2}) no-repeat;
	background-position: 50% 50%;
	background-size: cover;
	border-radius: var(--radius);

	aspect-ratio: 16 / 9;
	font-size: 1rem;

	/* mask:
		calc(var(--_d) + var(--x)) 0 var(--_m),
		0 calc(var(--_d) + var(--y)) var(--_m),
		radial-gradient(var(--inner-curve) at 0 0, #0000 99%, #000 calc(100% + 2px)) calc(var(--radius) + var(--x))
			calc(var(--radius) + var(--y)),
		var(--_g) calc(var(--_d) + var(--x)) 0,
		var(--_g) 0 calc(var(--_d) + var(--y));
	mask-repeat: no-repeat; */

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
	--rating: ${props => props.rate};
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
