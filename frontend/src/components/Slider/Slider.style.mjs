import styled from 'styled-components';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import 'swiper/css/scrollbar';
import { Swiper, SwiperSlide } from 'swiper/react';

export const StyledSliderContainer = styled(Swiper)`
	display: flex;
	justify-content: center;
	.swiper-wrapper {
		padding: 20px;
	}
`;

export const StyledSlider = styled(SwiperSlide)``;
