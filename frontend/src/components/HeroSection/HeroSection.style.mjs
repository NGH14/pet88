import StartSVG from 'assets/svg/star.svg';
import { styled } from 'styled-components';

export const HeroBlockStyled = styled.section`
	--margin-inline: 2rem;
	--r: 20px; /* the radius */
	--s: 20px; /* size of inner curve */
	--x: 12px; /* horizontal offset (no percentage) */
	--y: 16px; /* vertical offset (no percentage) */
	--_m: /calc(2 * var(--r)) calc(2 * var(--r)) radial-gradient(#000 70%, #0000 72%);
	--_g: conic-gradient(at var(--r) var(--r), #000 75%, #0000 0);
	--_d: (var(--s) + var(--r));

	background:
		linear-gradient(to top, rgba(0, 0, 0, 0.6), rgba(0, 0, 0, 0.1)),
		url(http://morkie.qodeinteractive.com/wp-content/uploads/2023/09/rev-home-2-slide-01.jpg)
			no-repeat;
	height: 700px;
	background-size: cover;
	border-radius: var(--r);

	margin-inline: var(--margin-inline);
	margin-block: -6.25em 6em;
	background-position: 50% 50%;
	z-index: 1;
	position: relative;

	width: calc(100% - 2 * var(--margin-inline));
	aspect-ratio: 1;
	font-size: 1em;

	mask:
		calc(var(--_d) + var(--x)) 0 var(--_m),
		0 calc(var(--_d) + var(--y)) var(--_m),
		radial-gradient(var(--s) at 0 0, #0000 99%, #000 calc(100% + 2px)) calc(var(--r) + var(--x))
			calc(var(--r) + var(--y)),
		var(--_g) calc(var(--_d) + var(--x)) 0,
		var(--_g) 0 calc(var(--_d) + var(--y));

	mask-repeat: no-repeat;

	@media only screen and (max-width: 425px) {
		background: linear-gradient(rgba(0, 0, 0, 0.6), rgba(0, 0, 0, 0.2)), no-repeat;
	}
`;

export const TextContainer = styled.section`
	color: var(--gray-500);
	position: absolute;
	bottom: 0px;
	right: 0px;
	z-index: 1;
	background-color: var(--white-700);
	border-radius:  35px 0 0 0;
	padding: 1em 2em;

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
	font-size: 2.5em;

	p {
		font-weight: 900;
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
