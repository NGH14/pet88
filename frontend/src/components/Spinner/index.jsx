import { SpinIcon, SpinnerWrapper, StyledSpin } from './Spinner.style.js';
import React from 'react';
import PropTypes from 'prop-types';

export const Spinner = ({ wrapHeight, iconSize }) => {
  return (
    <SpinnerWrapper heigh={wrapHeight}>
      <StyledSpin indicator={<SpinIcon fontSize={iconSize} />} />
    </SpinnerWrapper>
  );
};

Spinner.propTypes = {
  wrapHeight: PropTypes.string,
  iconSize: PropTypes.string
};

Spinner.defaultProps = {
  wrapHeight: '100px',
  iconSize: '100px'
};
