import { useTranslation } from 'react-i18next';

import { OpenCircle, StyledOperatingStatus } from './OperatingStatus.style.mjs';

export default function OperatingStatus() {
	const { t } = useTranslation();

	return (
		<StyledOperatingStatus>
			<OpenCircle />
			<p>{t('open')}</p>
		</StyledOperatingStatus>
	);
}
