import styled from 'styled-components';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import 'swiper/css/scrollbar';
import { Swiper, SwiperSlide } from 'swiper/react';

export const StyledSliderContainer = styled(Swiper)`
	display: ${props => props.$display ? props.$display : "flex"};
	justify-content: center;
`;

export const StyledSlider = styled(SwiperSlide)`
	object-fit: ${props => props.$fit ? props.$fit : "cover"};
`;
