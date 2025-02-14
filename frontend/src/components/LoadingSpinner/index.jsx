import './style.css';
import { Spin } from 'antd';
import { LoadingOutlined } from '@ant-design/icons';

import React from 'react';

const antIcon = (
	<LoadingOutlined
		style={{
			fontSize: 75,
			color: '#F76A1A',
		}}
		spin
	/>
);

function LoadingSpinner(props) {
	const { inputHeight } = props;
	return (
		<section
			className='loading_page'
			style={{ height: inputHeight ? inputHeight : '100vh' }}>
			<section className='loading_content'>
				<Spin indicator={antIcon} />
			</section>
		</section>
	);
}
export default React.memo(LoadingSpinner);
