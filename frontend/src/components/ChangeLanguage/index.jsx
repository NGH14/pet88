import { useTranslation } from 'react-i18next';

import { GlobalOutlined } from '@ant-design/icons';
import { Select } from 'antd';

const { Option } = Select;
const ChangeLanguage = () => {
	const { i18n } = useTranslation();

	const handleChange = code => {
		i18n.changeLanguage(code);
	};

	return (
		<>
			<Select
				prefix={<GlobalOutlined />}
				suffixIcon={null}
				style={{ width: '8em' }}
				variant="borderless"
				defaultValue={i18n.language}
				onChange={handleChange}
			>
				<Option value="en_US">English</Option>
				<Option value="vi_VN">Tiếng Việt</Option>
			</Select>
		</>
	);
};
export default ChangeLanguage;
