import { motion } from 'motion/react';

import {
	AbsoluteSection,
	AnimateSpan,
	AnimationContainer,
	StyledHyperLink,
} from './HyperLink.style.js';

const DURATION = 0.2;
const STAGGER = 0.025;

const HyperLink = ({ children, href, animation = true }) => {
	const absoluteStyle = {
		position: 'absolute',
		top: 0,
		left: 0,
		right: 0,
		bottom: 0,
	};

	return animation ? (
		<AnimationContainer initial="initial" whileHover="hovered" href={href}>
			{children.split('').map((l, i) => (
				<AnimateSpan
					key={i}
					variants={{ initial: { y: 0 }, hovered: { y: '-100%' } }}
					transition={{ duration: DURATION, ease: 'easeInOut', delay: STAGGER * i }}
				>
					{l}
				</AnimateSpan>
			))}

			<StyledHyperLink main={true}>
				{children.split('').map((l, i) => (
					<AnimateSpan
						key={i}
						variants={{ initial: { y: '100%' }, hovered: { y: 0 } }}
						transition={{ duration: DURATION, ease: 'easeInOut', delay: STAGGER * i }}
					>
						{l}
					</AnimateSpan>
				))}
			</StyledHyperLink>
		</AnimationContainer>
	) : (
		<StyledHyperLink href={href}>{children}</StyledHyperLink>
	);
};

export default HyperLink;
