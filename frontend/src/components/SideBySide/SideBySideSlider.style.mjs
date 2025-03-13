import ReactBeforeSliderComponent from 'react-before-after-slider-component';
import 'react-before-after-slider-component/dist/build.css';

import { styled } from 'styled-components';

const StyledSBSContainer = styled(ReactBeforeSliderComponent)`
	display: flex;
	align-items: center;
	flex-wrap: wrap;
	justify-content: center;
	gap: 2em;

	margin: 0 auto 80px auto;
	padding: 0.7em;

	img {
		border-radius: 45px;
		height: 400px;
	}
`;
