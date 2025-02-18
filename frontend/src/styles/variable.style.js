import * as styled from 'styled-components';

export const color = styled.css`
  --primary-color: #f76a1a;
  --pure-black: #171111;
  --dark-gray: #333333;
  --pure-white: #fafafa;
  --light-white: #f7f6f1;
`;

export const variable = css`
  :root {
    ${color}
  }
`;
