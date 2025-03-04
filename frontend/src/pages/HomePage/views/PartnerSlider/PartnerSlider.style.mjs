import { SliderContainer, SliderElement } from 'components/Slider/index.js';
import styled from 'styled-components';

export const HomeSilderContainer = styled(SliderContainer)`
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
`;
