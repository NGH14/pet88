import { LoadingOutlined } from '@ant-design/icons';
import { Spin } from 'antd';
import { styled,css } from 'styled-components';

export const SpinnerWrapper = styled.section`
	overflow: hidden;
	display: flex;
	align-items: center;
	justify-content: center;
	position: relative;
  height: ${props => (props.$height ? `${props.$height} !important` : '100vh')}}
`;

export const StyledSpin = styled(Spin)`
	${props => (props.$color ? props.$color : css`color: var(--primary-600)`)};
`;

export const SpinIcon = styled(LoadingOutlined)`
	font-size: ${props => `${props.$fontSize} !important` || '100px !important'};
`;
