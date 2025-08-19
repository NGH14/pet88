import { useTranslation } from 'react-i18next';

import { GlobalOutlined } from '@ant-design/icons';
import { Select } from 'antd';
import { ENGLISH_LOCALE_CODE, VIETNAM_LOCALE_CODE } from '~/utils/i18n/config.mjs';

const { Option } = Select;
const ChangeLanguage = () => {
	const { i18n } = useTranslation();

	const handleChange = code => {
		i18n.changeLanguage(code);
	};

	return (
		<>
			<Select
				aria-label="Change language"
				prefix={<GlobalOutlined />}
				suffixIcon={null}
				style={{ width: '8em' }}
				variant="borderless"
				defaultValue={i18n.language}
				onChange={handleChange}>
				<Option value={`${ENGLISH_LOCALE_CODE}`}>English</Option>
				<Option value={`${VIETNAM_LOCALE_CODE}`}>Tiếng Việt</Option>
			</Select>
		</>
	);
};
export default ChangeLanguage;
