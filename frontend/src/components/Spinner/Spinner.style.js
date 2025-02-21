import { LoadingOutlined } from '@ant-design/icons';
import { Spin } from 'antd';
import { styled } from 'styled-components';

export const SpinnerWrapper = styled.section`
	overflow: hidden;
	display: flex;
	align-items: center;
	justify-content: center;
	position: relative;
  height: ${props => props.height || '100vh'}}
`;

export const StyledSpin = styled(Spin)`
	color: #f76a1a;
`;

export const SpinIcon = styled(LoadingOutlined)`
	font-size: ${props => `${props.fontSize} !important` || '100px !important'};
`;
