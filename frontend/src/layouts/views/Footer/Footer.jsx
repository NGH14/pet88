import React from 'react';
import { Trans, useTranslation } from 'react-i18next';
import { NavLink } from 'react-router';

import HyperLink from 'components/HyperLink/HyperLink.jsx';
import { Logo } from 'components/Logo/Logo.jsx';
import CONTACT_DETAIL from 'constants/contact.mjs';

import {
	FooterContainer,
	FooterContentFlexBox,
	FooterContentGrid,
	FooterCopyRight,
	FooterTitle,
} from './Footer.style.mjs';

import WaveSVG from './Wave.jsx';

export default function Footer() {
	const [t] = useTranslation();
	return (
		<FooterContainer>
			<WaveSVG />
			<FooterContentGrid>
				<FooterTitle>{t('working time')}</FooterTitle>
				{CONTACT_DETAIL.workingTime.schedule.map((working, index) => (
					<p key={index}>
						{working.day} - {working.time}
					</p>
				))}

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

				<FooterTitle>{t('location')}</FooterTitle>
				<ul id="menu-quick-links" className="footer-menu-list">
					<li className="menu-item menu-item-type-custom menu-item-object-custom">
						<p>{t('418 Truong Sa, Phu Nhuan, Ho Chi Minh City')}</p>
					</li>
					<li className="menu-item menu-item-type-custom menu-item-object-custom">
						<p>{t('969 Xuan Thuy, Thao Dien, Ho Chi Minh City')}</p>
					</li>
				</ul>
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
