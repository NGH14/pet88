import { useState } from 'react';

import { message } from 'antd';
import {t} from 'i18next';
import copy from 'copy-to-clipboard';

export default function useCopyToClipboard() {
	const [value, setValue] = useState();
	const [success, setSuccess] = useState();

	const successMessage = () => {
		message.success(t('Copied to clipboard'));
	};
	const copyToClipboard = (text, options) => {
		const result = copy(text, options);
		if (result) setValue(text);
		setSuccess(result);
		successMessage();
	};

	return [copyToClipboard, { value, success }];
}
