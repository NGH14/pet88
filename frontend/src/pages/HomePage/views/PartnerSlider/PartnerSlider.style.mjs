import styled from 'styled-components';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/swiper-bundle.min.css';

export const SliderContainer = styled(Swiper)`
	border-radius: 45px;
	border: 0.5px solid var(--gray-300);

	display: flex;
	justify-content: center;
	.swiper-wrapper {
		padding: 20px;
	}
`;
