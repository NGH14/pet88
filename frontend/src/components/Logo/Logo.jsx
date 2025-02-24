import IconLogo from 'assets/images/logo/icon-logo-white.png';
import { styled } from 'styled-components';

export const Logo = styled.img.attrs(props => ({
	src: props.Img || IconLogo,
}))`
	max-height: 30px;
	filter: brightness(0%);
`;
