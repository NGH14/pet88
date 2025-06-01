import React from 'react';

import PropTypes from 'prop-types';

import { SpinIcon, SpinnerWrapper, StyledSpin } from './Spinner.style.js';

const Spinner = ({ wrapHeight, iconSize, spinColor }) => {
	return (
		<SpinnerWrapper $height={wrapHeight}>
			<StyledSpin indicator={<SpinIcon $fontSize={iconSize} $color={spinColor} />} />
		</SpinnerWrapper>
	);
};

Spinner.propTypes = {
	wrapHeight: PropTypes.string,
	iconSize: PropTypes.string,
	spinColor: PropTypes.string,
};

Spinner.defaultProps = {
	wrapHeight: '100vh',
	iconSize: '100px',
};

export default Spinner;
