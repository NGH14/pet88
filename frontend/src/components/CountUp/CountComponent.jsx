import CountUp from 'react-countup';

import { CountingContainer } from './CountComponent.style.mjs';

const CountUpComponent = props => {
	const { size, weight, color, ...rest } = props;
	return (
		<CountingContainer $size={size} $weight={weight} $color={color}>
			<CountUp {...rest} />
		</CountingContainer>
	);
};

export default CountUpComponent;
