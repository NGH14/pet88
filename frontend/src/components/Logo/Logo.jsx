import DarkLogo from 'assets/images/BlackLogo.png';
import { styled } from 'styled-components';

export const Logo = styled.img.attrs(props => ({
	src: props.Img || DarkLogo,
}))`
	max-height: 30px;
`;
