import bgImg from 'assets/images/navy-bg.png';
import { styled } from 'styled-components';

export const FooterContainer = styled.section`
  --footer-columns: 4;
  --footer-columns-row-gap: 1em;
  --footer-columns-col-gap: 1em;
  color: var(--color-white);
  background-image: url(${bgImg});
  background-size: cover;
  position: relative;
  z-index: 1;
`;

export const FooterContent = styled.section`
  display: grid;
  grid-template-columns: repeat(var(--footer-columns), minmax(0, 1fr));
  row-gap: var(--footer-columns-row-gap);
  column-gap: var(--footer-columns-col-gap);
  padding: 1em 1em;
  position: relative;
`;

export const FooterTitle = styled.h3`
  font-size: 1.5em;
  margin-bottom: 1em;
  font-weight: 700;
  color: var(--color-white);
  text-transform: capitalize;
`;

export const FooterCopyRight = styled.section`
  color: var(--color-white);
  background-image: url(${bgImg});
  background-size: cover;
  position: relative;
  z-index: 1;
`;
