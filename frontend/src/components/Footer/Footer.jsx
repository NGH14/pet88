import React from 'react';
import { useTranslation, Trans } from 'react-i18next';

import logo from 'assets/images/logo-text.png';
import WaveSVG from 'components/Wave/WavePath.jsx';
import CONTACT_DETAIL from 'constants/contact.mjs';

import { FooterContainer, FooterContent, FooterTitle } from './Footer.style.mjs';

export default function FooterWave() {
	const [t] = useTranslation();
	return (
		<FooterContainer>
			<WaveSVG />
			<FooterContent>
				<section className="footer-menu">
					<FooterTitle>{t('working time')}</FooterTitle>
					{/* <ul id="menu-get-started" className="footer-menu-list">
						<li className="menu-item menu-item-type-post_type menu-item-object-product">
							<p>
								{t('Monday')} - {t('Saturday')}
							</p>
							<p>08:00 - 14:00</p>
							<p>
								{t('Sunday')} & {t('Holidays')}
							</p>
							<p>08:00 - 12:00</p>
						</li>
					</ul> */}
					{CONTACT_DETAIL.workingTime.schedule.map((working, index) => (
						<p key={index}>
							<Trans>
									{working.day} - {working.time}
							</Trans>

						</p>
					))}
				</section>

				<section className="footer-call-to-action">
					<FooterTitle className="footer-menu-name"> {t('email')} </FooterTitle>
										<p className="footer-call-to-action-link-wrapper">

					<a
						className="footer-call-to-action-link"
						href={`mailto:${CONTACT_DETAIL.email.address}?subject=Feedback&body = Message"`}
						target="_self"
					>
						{CONTACT_DETAIL.email.address}
					</a>
					</p>


					<FooterTitle className="footer-call-to-action-title">{t('calling us')}</FooterTitle>
					<p className="footer-call-to-action-link-wrapper">
						<a className="footer-call-to-action-link" href="tel:+0916x4841" target="_self">
							(+84) 0916x4841
						</a>
					</p>
				</section>


				<section className="footer-menu">
					<FooterTitle>{t('location')}</FooterTitle>
					<ul id="menu-quick-links" className="footer-menu-list">
						<li className="menu-item menu-item-type-custom menu-item-object-custom">
							<p>{t('418 Truong Sa, Phu Nhuan, Ho Chi Minh City')}</p>
						</li>
						<li className="menu-item menu-item-type-custom menu-item-object-custom">
							<p>{t('969 Xuan Thuy, Thao Dien, Ho Chi Minh City')}</p>
						</li>
					</ul>
				</section>
			</FooterContent>
			<section className="footer-copyright">
				<p className="footer-copyright-link">
					©2022. Pet88 | {t('from')}
					<a href="https://www.linkedin.com/in/vu-huu-nghia/"> Nghia </a>
					{t('with love')}
				</p>
			</section>
		</FooterContainer>
	);
}
