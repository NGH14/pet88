import * as Styled from './Typography.style.mjs';

const Typography = ({ tag = 'p', children }) => (
	<Styled.DynamicTypography tag={tag}>{children}</Styled.DynamicTypography>
);

export default Typography;
