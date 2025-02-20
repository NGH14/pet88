import {styled} from 'styled-components';
import bgImg from 'assets/images/navy-bg.png';

export const FooterContainer = styled.footer`
  color: var(--color-white);
  background-image: url(${bgImg});
  background-size: cover;
  background-position: center;
  background-repeat: no-repeat;
  padding: 10rem 0;
  position: relative;
  z-index: 1;
  `
export { FooterContainer }
