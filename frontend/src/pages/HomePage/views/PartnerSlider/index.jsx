import { memo } from 'react';

import { HomeSilderContainer, HomeSliderElement } from './PartnerSlider.style.mjs';

const HomeSlider = props => {
	const { config, data, ...rest } = props;

	return (
		<HomeSilderContainer {...config}>
			{data?.map(({ id, src, fallback, alt }) => (
				<HomeSliderElement key={id}>
					<picture key={id}>
						<source srcSet={src} type="image/webp" />
						<img src={fallback} alt={alt} loading="lazy" />
					</picture>
				</HomeSliderElement>
			))}
		</HomeSilderContainer>
	);
};

export default memo(HomeSlider);

export { HomeSilderContainer, HomeSliderElement };
