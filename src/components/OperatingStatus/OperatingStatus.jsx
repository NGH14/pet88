import { useState } from 'react';
import { useTranslation } from 'react-i18next';

import { OpenCircle, StyledOperatingStatus } from './OperatingStatus.style.mjs';

const OpenOperating = () => {
	const { t } = useTranslation();
	return (
		<>
			<OpenCircle />
			<p>{t('open')}</p>
		</>
	);
};

const ClosedOperating = () => {
	const { t } = useTranslation();
	return (
		<>
			<p>{t('closed')}</p>
		</>
	);
};

export default function OperatingStatus() {
	const [open, setOpen] = useState(true);

	return (
		<StyledOperatingStatus>{open ? <OpenOperating /> : <ClosedOperating />}</StyledOperatingStatus>
	);
}
