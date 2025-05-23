import React from 'react';
import { useTranslation } from 'react-i18next';
import { NavLink } from 'react-router';

import img from 'assets/images/undraw_bug_fixing_oc7a (1).png';

import './style.css';

export default function UnderDev() {
	const { t, i18n } = useTranslation();
	return (
		<>
			<section className="underpage">
				<section className="underpage-form">
					<img src={img} alt="" style={{ height: 200 }} />
					<h1
						style={{
							fontWeight: 700,
							margin: 15,
							textTransform: 'capitalize',
						}}
					>
						{t('Site under construction and maintenance')}
					</h1>

					<p>{t('Sorry about this inconvenience, please come back later')}</p>

					<NavLink to={'/'}>Go Back</NavLink>
				</section>
			</section>
		</>
	);
}
