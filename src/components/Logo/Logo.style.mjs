import PrimaryWebP from 'assets/images/logo/icon-logo-primary.webp';
import { styled } from 'styled-components';

export const DefaultLogo = styled.img.attrs(props => ({
	src: props.Img || PrimaryWebP,
	alt: 'Pet88 Logo',
}))`
	${props => (props.maxHeight ? `max-height: ${props.maxHeight}` : 'max-height: 32px')};
	${props => props.dark && `filter: brightness(0%)`};
`;
