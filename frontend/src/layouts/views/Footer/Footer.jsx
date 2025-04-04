import { memo } from 'react';
import { Trans, useTranslation } from 'react-i18next';
import { NavLink } from 'react-router';

import HyperLink from '~/components/HyperLink/HyperLink.jsx';
import { Logo } from '~/components/Logo/Logo.jsx';
import CONTACT_DETAIL from '~/constants/contact.mjs';
import { NAMESPACE } from '~/utils/i18n/config.mjs';

import {
	FooterContainer,
	FooterContentFlexBox,
	FooterContentGrid,
	FooterCopyRight,
	FooterTitle,
} from './Footer.style.mjs';

function Footer() {
	const { t } = useTranslation(NAMESPACE.commonNS);
	return (
		<FooterContainer>
			<FooterContentGrid>
				<section>
					<FooterTitle>{t('working time')}</FooterTitle>
					{CONTACT_DETAIL.workingTime.schedule.map((working, index) => (
						<p key={index}>
							{working.day} - {working.time}
						</p>
					))}
				</section>

				<section>
					<FooterTitle className="footer-menu-name"> {t('email')} </FooterTitle>
					<p className="footer-call-to-action-link-wrapper">
						<HyperLink
							href={`mailto:${CONTACT_DETAIL.email.address}?subject=Feedback&body = Message"`}
							animation={false}
							target="_self"
						>
							{CONTACT_DETAIL.email.address}
						</HyperLink>
					</p>

					<FooterTitle>{t('calling us')}</FooterTitle>
					<p>
						<HyperLink href="tel:+0916x4841" target="_self" animation={true}>
							(+84) 916x4841
						</HyperLink>
					</p>
				</section>

				<section>
					<FooterTitle>{t('location')}</FooterTitle>
					<ul id="menu-quick-links" className="footer-menu-list">
						<li className="menu-item menu-item-type-custom menu-item-object-custom">
							<p>{t('address@Cong_Hoa')}</p>
						</li>
						<li className="menu-item menu-item-type-custom menu-item-object-custom">
							<p>{t('address@Truong_Sa')}</p>
						</li>
					</ul>
				</section>
			</FooterContentGrid>
			<FooterCopyRight>
				<p>©2025. Pet88 | {t('all rights reserved')}</p>
				<p>
					{t('made by')}
					<a href="https://www.linkedin.com/in/vu-huu-nghia/"> NGHIA </a>
				</p>
			</FooterCopyRight>
		</FooterContainer>
	);
}

export default memo(Footer);
