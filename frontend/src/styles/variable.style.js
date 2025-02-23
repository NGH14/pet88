import * as styled from 'styled-components';

export const color = styled.css`
	--primary-color: #F76A1A;
	--pure-black: #171111;
	--dark-gray: #333333;
	--gray-100: #F5F5F5;
	--gray-300: #D3D3D3;
	--gray-500: #A9A9A9;
	--gray-700: #7F7F7F;
	--green-100: #88E788;
	--green-300: #00B300;
	--green-500: #008000;
	--green-700: #004C00;
	--white-300: #FAFAFA;
	--pure-white: #FFFFFF;
	--light-white: #F7F6F1;
	--color-white: #E5E5E5;
`;

export const variable = styled.css`
	:root {
		${color}
	}
`;
