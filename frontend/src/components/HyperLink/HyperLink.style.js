import { motion } from 'motion/react';
import styled, { css } from 'styled-components';

export const StyledHyperLink = styled.a`
	font-size: 1em;
	text-decoration: none;
	font-weight: 700;
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
	display: inline-block;
	overflow: hidden;
	font-weight: 700;
	white-space: nowrap;
	text-transform: uppercase;
	max-width: fit-content;
`;

export const AnimateSpan = styled(motion.span)`
	display: inline-block;
`;
