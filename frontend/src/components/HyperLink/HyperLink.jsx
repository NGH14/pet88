import { motion } from 'motion/react';

import { StyledHyperLink, Container } from './HyperLink.style.js';

const DURATION = 0.25;
const STAGGER = 0.025;

const HyperLink = ({ children, href }) => {
  const containerStyle = {
    position: 'relative',
    display: 'block',
    overflow: 'hidden',
    whiteSpace: 'nowrap',
    fontSize: '1em',
    fontWeight: '900',
    textTransform: 'uppercase',
  };

  const spanStyle = {
    display: 'inline-block',
  };

  const absoluteStyle = {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
  };

  return (
    <motion.Container initial="initial" whileHover="hovered" href={href} >
      <section>
        {children.split('').map((l, i) => (
          <motion.span
            key={i}
            variants={{ initial: { y: 0 }, hovered: { y: '-100%' } }}
            transition={{ duration: DURATION, ease: 'easeInOut', delay: STAGGER * i }}
            style={spanStyle}
          >
            {l}
          </motion.span>
        ))}
      </section>
      <a style={absoluteStyle}>
        {children.split('').map((l, i) => (
          <motion.span
            key={i}
            variants={{ initial: { y: '100%' }, hovered: { y: 0 } }}
            transition={{ duration: DURATION, ease: 'easeInOut', delay: STAGGER * i }}
            style={spanStyle}
          >
            {l}
          </motion.span>
        ))}
      </a>
    </motion.Container>
  );
};

export default HyperLink;
