import { motion } from 'motion/react';

import { AnimateSpan, AnimationContainer, StyledHyperLink } from './HyperLink.style.js';

const DURATION = 0.2;
const DELAY = 0.025;

const HyperLink = ({ children, href, target, animation = true }) => {
	return animation ? (
		<AnimationContainer initial="initial" whileHover="hovered" href={href} target={target}>
			{children.split('').map((l, i) => (
				<AnimateSpan
					key={i}
					variants={{ initial: { y: 0 }, hovered: { y: '-105%' } }}
					transition={{ duration: DURATION, ease: 'easeInOut', delay: DELAY * i }}
				>
					{l}
				</AnimateSpan>
			))}

			<StyledHyperLink $main={true}>
				{children.split('').map((l, i) => (
					<AnimateSpan
						key={i}
						variants={{ initial: { y: '100%' }, hovered: { y: 0 } }}
						transition={{ duration: DURATION, ease: 'easeInOut', delay: DELAY * i }}
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
