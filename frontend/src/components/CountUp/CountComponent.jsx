import CountUp from 'react-countup';
import { CountingContainer } from './CountComponent.style.mjs';

const CountUpComponent = (props) => {
	const {size, weight, ...rest} = props;
	return (
		<CountingContainer $size={size} $weight={weight}>
			<CountUp {...rest}/>
		</CountingContainer>
	);
};

export default CountUpComponent;