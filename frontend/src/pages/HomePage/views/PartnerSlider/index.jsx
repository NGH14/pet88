import { memo } from 'react';

import { Autoplay} from 'swiper';
import { HomeSliderContainer, HomeSliderElement } from './PartnerSlider.style.mjs';

const HomeSlider = props => {
	const { config, data, ...rest } = props;

	return (
		<HomeSliderContainer {...config} modules={[Autoplay]}>
			{data?.map(({ id, src, fallback, alt }) => (
				<HomeSliderElement key={id}>
					<picture key={id}>
						<source srcSet={src} type="image/webp" />
						<img src={fallback} alt={alt} loading="lazy" />
					</picture>
				</HomeSliderElement>
			))}
		</HomeSliderContainer>
	);
};

export default memo(HomeSlider);

export { HomeSliderContainer, HomeSliderElement };
