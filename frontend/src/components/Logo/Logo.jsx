import IconLogo from 'assets/images/logo/icon-logo-primary.png';
import { styled } from 'styled-components';

export const Logo = styled.img.attrs(props => ({
	src: props.Img || IconLogo,
	alt: 'Pet88 Logo',
}))`
	${props => (props.maxHeight ? `max-height: ${props.maxHeight}` : 'max-height: 40px')};
	${props => props.dark && `filter: brightness(0%)`};
`;
