import styled from 'styled-components';
import { SliderContainer, SliderElement } from '~/components/Slider/index.js';

export const HomeSliderContainer = styled(SliderContainer)`
	padding: 0.5em;
	margin: 2em auto;
	border-radius: 45px;
	border: 0.5px solid var(--gray-300);

	display: flex;
	justify-content: center;
	.swiper-wrapper {
		padding: 1.5em;
	}
`;

export const HomeSliderElement = styled(SliderElement)`
	text-align: center;
	background: #fff;
	margin-inline: auto;
	display: flex;
	justify-content: center;
	align-items: center;

	img {
		display: inline-block;
		width: 100px;
		height: 32px;
		object-fit: contain;
		aspect-ratio: 3/2;
	}
`;
