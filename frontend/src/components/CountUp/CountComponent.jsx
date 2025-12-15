
import React from 'react';
import PropTypes from 'prop-types';
import CountUp from 'react-countup';
import { CountingContainer } from './CountComponent.style.mjs';

/**
 * CountUpComponent - Animated number counter with customizable style.
 *
 * @param {object} props
 * @param {string|number} [props.size] - Font size for the counter.
 * @param {string|number} [props.weight] - Font weight for the counter.
 * @param {string} [props.color] - Text color for the counter.
 * @param {number} [props.start] - Start value for the counter.
 * @param {number} [props.end] - End value for the counter.
 * @param {number} [props.duration] - Animation duration in seconds.
 * @param {function} [props.onEnd] - Callback when animation ends.
 * @param {function} [props.onStart] - Callback when animation starts.
 * @param {object} [props.rest] - Other CountUp props.
 */

const defaultProps = {
	size: '5em',
	weight: 800,
	color: 'var(--primary-600)',
	start: 0,
	end: 100,
	duration: 2,
	onEnd: undefined,
	onStart: undefined,
};

const CountUpComponent = React.memo(function CountUpComponent({
	defaultProps,
	...rest
}) {
	return (
		<CountingContainer $size={size} $weight={weight} $color={color}>
			<CountUp
				start={start}
				end={end}
				duration={duration}
				onEnd={onEnd}
				onStart={onStart}
				{...rest}
			/>
		</CountingContainer>
	);
});

CountUpComponent.propTypes = {
	size: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
	weight: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
	color: PropTypes.string,
	start: PropTypes.number,
	end: PropTypes.number,
	duration: PropTypes.number,
	onEnd: PropTypes.func,
	onStart: PropTypes.func,
};

CountUpComponent.defaultProps = {
	size: '5em',
	weight: 800,
	color: 'var(--primary-600)',
	start: 0,
	end: 100,
	duration: 2,
	onEnd: undefined,
	onStart: undefined,
};

export default CountUpComponent;
