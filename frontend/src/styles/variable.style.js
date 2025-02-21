import * as styled from 'styled-components';

export const color = styled.css`
	--primary-color: #f76a1a;
	--pure-black: #171111;
	--dark-gray: #333333;
	--gray-300: #f3f3f3;
	--white-300: #fafafa;
	--pure-white: #ffffff;
	--light-white: #f7f6f1;
	--color-white: #e5e5e5;
`;

export const variable = styled.css`
	:root {
		${color}
	}
`;
