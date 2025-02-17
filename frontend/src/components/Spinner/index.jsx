import { SpinIcon, LoadingWrapper, StyledSpin } from './Spinner.style';
import React from 'react';

function LoadingSpinner() {
	return (
		<LoadingWrapper>
			<StyledSpin indicator={<SpinIcon />} />
		</LoadingWrapper>
	);
}
export default LoadingSpinner;
