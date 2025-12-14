import { createElement } from 'react';

import styled from 'styled-components';

export const StyledTypography = styled(({ tag, children, ...props }) =>
	createElement(tag, props, children)
);
