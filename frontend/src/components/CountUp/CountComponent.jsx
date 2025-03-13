import CountUp from 'react-countup';

import PropTypes from 'prop-types';

import { CountingContainer } from './CountComponent.style.mjs';

const CountUpComponent = props => {
	const { size, weight, color, ...rest } = props;
	return (
		<CountingContainer $size={size} $weight={weight} $color={color}>
			<CountUp {...rest} />
		</CountingContainer>
	);
};

// CountUpComponent.propTypes = {
// 	size: PropTypes.number,
// 	weight: PropTypes.number,
// 	color: PropTypes.string,
// };

// CountUpComponent.defaultProps = {
// 	size: PropTypes.number,
// 	weight: PropTypes.number,
// 	color: PropTypes.string,
// };

export default CountUpComponent;
