import logo from 'assets/images/logo-text.png';
import bgImg from 'assets/images/navy-bg.png';
import WaveSVG from 'components/Wave/Wave.jsx';
import CONTACT_DETAIL from 'constants/contact.mjs';
import React from 'react';
import { useTranslation } from 'react-i18next';

import { FooterContainer } from './Footer.style';
import './style.css';

export default function FooterWave() {
  const [t] = useTranslation();
  const workingTime = t('CONTACT_DETAIL.workingTime', { returnObjects: true });
  return (
    <FooterContainer>
      <footer
        className="footer"
        style={{
          backgroundImage: `url(${bgImg})`,
        }}
      >
        <WaveSVG />
        <section className="footer-content">
          <section className="footer-content-column">
            <section className="footer-menu">
              <h2 className="footer-menu-name">{t('working time')}</h2>
              <ul id="menu-get-started" className="footer-menu-list">
                <li className="menu-item menu-item-type-post_type menu-item-object-product">
                  {/* <p>
                    {t('Monday')} - {t('Saturday')}
                  </p>
                  <p>08:00 - 14:00</p>
                  <p>
                    {t('Sunday')} & {t('Holidays')}
                  </p>
                  <p>08:00 - 12:00</p> */}
                  {workingTime.content.map((item, index) => (
                    <p key={index}>
                      {item.day} - {item.time}
                    </p>
                  ))}
                </li>
              </ul>
            </section>
          </section>

          <section className="footer-content-column">
            <section className="footer-call-to-action">
              <h2 className="footer-menu-name"> {t('Email')} </h2>
              <p className="footer-call-to-action-description">{t('Have a support question')}?</p>
              <a
                className="footer-call-to-action-button"
                href={`mailto:${CONTACT_DETAIL.email.address}?subject=Feedback&body = Message"`}
                target="_self"
              >
                {CONTACT_DETAIL.email.address}
              </a>
            </section>
            <section className="footer-call-to-action">
              <h2 className="footer-call-to-action-title">{t('Calling us')}</h2>
              <p className="footer-call-to-action-link-wrapper">
                <a className="footer-call-to-action-link" href="tel:+0916x4841" target="_self">
                  (+84) 0916x4841
                </a>
              </p>
            </section>
          </section>
          <section className="footer-content-column">
            <section className="footer-menu">
              <h2 className="footer-menu-name">{t('Location')}</h2>
              <ul id="menu-quick-links" className="footer-menu-list">
                <li className="menu-item menu-item-type-custom menu-item-object-custom">
                  <p>{t('418 Truong Sa, Phu Nhuan, Ho Chi Minh City')}</p>
                </li>
                <li className="menu-item menu-item-type-custom menu-item-object-custom">
                  <p>{t('969 Xuan Thuy, Thao Dien, Ho Chi Minh City')}</p>
                </li>
              </ul>
            </section>
          </section>
        </section>
        <section className="footer-copyright">
          <section className="footer-copyright-wrapper">
            <p className="footer-copyright-link">
              ©2022-2025. Pet88 | {t('from')}
              <a href="https://www.linkedin.com/in/vu-huu-nghia/"> Nghia </a>
              {t('with love')}
            </p>
          </section>
        </section>
      </footer>
    </FooterContainer>
  );
}
