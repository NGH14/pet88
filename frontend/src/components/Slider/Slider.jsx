import { Autoplay } from 'swiper';

import { StyledSlider, StyledSliderContainer } from './Slider.style.mjs';

const SliderComponent = props => {
	const { data, config, ...rest } = props;
	return (
		<StyledSliderContainer spaceBetween={50} slidesPerView={3} modules={[Autoplay]}>
			{data.map((slide, index) => (
				<StyledSlider key={index} {...rest}>
					{slide}
				</StyledSlider>
			))}
		</StyledSliderContainer>
	);
};

export default SliderComponent;
