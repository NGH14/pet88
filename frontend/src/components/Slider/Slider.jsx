import { Autoplay } from 'swiper';

import { StyledSlider, StyledSliderContainer } from './Slider.style.mjs';

const SliderComponent = props => {
	const { data, ...rest } = props;

	return (
		<StyledSliderContainer modules={[Autoplay]}>
			{data.map((slide, index) => (
				<StyledSlider key={index}  {...rest} >
					{slide}
				</StyledSlider>
			))}
		</StyledSliderContainer>
	);
};

export default SliderComponent;