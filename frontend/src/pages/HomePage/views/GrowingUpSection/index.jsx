import { memo } from 'react';
import { useTranslation } from 'react-i18next';



import { CountUpComponent as GrowUpCount } from 'components/CountUp';



import { GrowUpContainer, GrowUpElement, GrowUpSubText } from './GrowingUpSection.style.mjs';





const DURATION = 1.5;
const GrowUpSection = ({stats}) => {
	const [t] = useTranslation('homepage');
	return (
		<GrowUpContainer>
			{stats &&
				stats?.map((stat, index) => (
					<GrowUpElement key={index}>
						<GrowUpCount end={stat.number} suffix={stat.prefix} duration={DURATION} />
						<GrowUpSubText>{t(stat.title)}</GrowUpSubText>;
					</GrowUpElement>
				))}
		</GrowUpContainer>
	);
};

export default memo(GrowUpSection);