import CountUp from 'react-countup';

import { CountingContainer } from './CountComponent.style.mjs';

const CountUpComponent = ({ size, weight, ...rest }) => {
	return (
		<CountingContainer $size={size} $weight={weight}>
			<CountUp {...rest}/>
		</CountingContainer>
	);
};

export default CountUpComponent;