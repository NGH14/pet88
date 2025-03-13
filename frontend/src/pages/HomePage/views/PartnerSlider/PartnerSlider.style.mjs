import styled from 'styled-components';
import { SliderContainer, SliderElement } from '~/components/Slider/index.js';

export const HomeSliderContainer = styled(SliderContainer)`
	border-radius: 45px;
	border: 0.5px solid var(--gray-300);

	display: flex;
	justify-content: center;
	.swiper-wrapper {
		padding: 20px;
	}
`;

export const HomeSliderElement = styled(SliderElement)`
	text-align: center;
	font-size: 18px;
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
