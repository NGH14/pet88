import { motion } from 'motion/react';
import styled, {css} from 'styled-components';

export const StyledHyperLink = styled.a`
	text-decoration: none;
	font-weight: 900;
	&:hover {
		color: var(--primary-color);
	}

	${props =>
    props.main == true &&
		css`
			position: absolute;
			top: 0;
			left: 0;
			right: 0;
			bottom: 0;
		`}
`;

export const AnimationContainer = styled(motion.StyledHyperLink)`
	position: relative;
	display: block;
	overflow: hidden;
	white-space: nowrap;
	font-size: 14px;
	text-transform: uppercase;
`;

export const AnimateSpan = styled(motion.span)`
	display: inline-block;
`;

export const AbsoluteSection = styled.section`
	position: absolute;
	top: 0;
	left: 0;
	right: 0;
	bottom: 0;
`;
