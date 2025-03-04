import { StyledSliderContainer, StyledSlider } from './Slider.style.mjs';





const SliderComponent = props => {
	const { data, ...rest } = props;

	return (
		<StyledSliderContainer>
			{data.map((slide, index) => (
				<StyledSlider key={index} {...rest}>
					{slide}
				</StyledSlider>
			))}
		</StyledSliderContainer>
	);
};

export default SliderComponent;