import { useTranslation } from 'react-i18next';
import { UserLanguage } from 'context/LanguageContext';
import { Select} from "antd"
import { GlobalOutlined } from '@ant-design/icons';
const { Option } = Select;

const ChangeLanguage = () => {
	const  { i18n } = useTranslation();
	const { lang ,SetLanguage } = UserLanguage();

	const handleChange = (lang) => {
		i18n.changeLanguage(lang);
		SetLanguage(lang);
	};

	return (
		<>
			<Select
				prefix={<GlobalOutlined />}
				suffixIcon={null}
				style={{ width: '8em' }}
				variant='borderless'
				defaultValue={lang}
				onChange={handleChange}
			>
				<Option value='en_US'>English</Option>
				<Option value='vi_VN'>Tiếng Việt</Option>
			</Select>
		</>
	);
};
export default ChangeLanguage;
