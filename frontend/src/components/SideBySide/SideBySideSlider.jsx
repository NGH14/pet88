import { memo } from 'react';

import { StyledSBSContainer } from './SideBySideSlider.style.mjs';

const SideBySideSlider = props => {
	const { children, ...rest } = props;
	return <StyledSBSContainer>{children}</StyledSBSContainer>;
};

export default memo(SideBySideSlider);
