import { styled } from 'styled-components';

export const CountingContainer = styled.section`
	font-size: ${props => (props.$size ? props.$size : '5em')};
	font-weight: ${props => (props.$weight ? props.$weight : '800')};
	color: ${props => (props.$color ? props.$color : 'var(--primary-500)')};
`;
