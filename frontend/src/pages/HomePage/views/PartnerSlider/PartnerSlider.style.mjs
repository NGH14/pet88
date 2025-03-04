import styled from 'styled-components';
import { SliderContainer } from 'components/Slider/index.js';

export const SliderHomePage = styled(SliderContainer)`
	border-radius: 45px;
	border: 0.5px solid var(--gray-300);

	display: flex;
	justify-content: center;
	.swiper-wrapper {
		padding: 20px;
	}
`;
