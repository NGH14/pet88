import { Select, Space } from 'antd';
import { GlobalOutlined, CaretDownOutlined } from '@ant-design/icons';

import React, { useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { UserLanguage } from '../../context/LanguageContext';
const { Option } = Select;

const ChangeLanguage = ({ TextColor = 'black', fullWidth }) => {
	const [t, i18n] = useTranslation();
	const { lang, SetLanguage } = UserLanguage();
	const handleChange = (lng) => {
		i18n.changeLanguage(lng);
		localStorage.setItem('lng', lng);
		SetLanguage(lng);
	};

	return (
		<Select
			showArrow={false}
			suffixIcon={
				<CaretDownOutlined
					style={{
						color: TextColor,
					}}
				/>
			}
			bordered={false}
			defaultValue={lang}
			style={{
				width: fullWidth ? '100%' : 100,
				fontFamily: 'Nunito Sans',
				color: TextColor,
				fontSize: 12,
			}}
			onChange={handleChange}>
			<Option
				value='en'
				style={{
					width: fullWidth ? '100%' : 100,
					fontFamily: 'Nunito Sans',
					fontSize: 12,
				}}>
				English
			</Option>
			<Option
				value='vi'
				style={{
					width: fullWidth ? '100%' : 100,
					fontFamily: 'Nunito Sans',
					fontSize: 12,
				}}>
				Tiếng Việt
			</Option>
		</Select>
	);
};
export default ChangeLanguage;
