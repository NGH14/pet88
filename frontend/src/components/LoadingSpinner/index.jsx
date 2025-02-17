import './style.css';
import { SpinIcon, LoadingWrapper, StyledSpin } from './Spinner.style';
import React from 'react';

function LoadingSpinner(props) {
	return (
		<LoadingWrapper>
			<StyledSpin indicator={<SpinIcon />} />
		</LoadingWrapper>
	);
}
export default LoadingSpinner;
