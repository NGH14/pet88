import {
  Breadcrumb,
  Button,
  Card,
  ConfigProvider,
  DatePicker,
  Form,
  Input,
  Layout,
  Select,
  Skeleton,
  Space,
  Steps,
  Table,
  sectionider,
} from 'antd';
import viVN from 'antd/es/locale/vi_VN';
import axios from 'axios';
import AppHeader from 'components/Navbar';
import SubNavBar from 'components/views/SubHeader/SubHeader.jsx';
import React from 'react';
import { useTranslation } from 'react-i18next';
import { useLocation, useNavigate } from 'react-router';

import './style.css';

const { Header, Content } = Layout;

export default function PaymentSuccess() {
  const { t, i18n } = useTranslation();

  return (
    <ConfigProvider locale={i18n.language === 'vi_VN' && viVN}>
      <Layout className="departhtLayout">
        <Header>
          <SubNavBar></SubNavBar>
          <AppHeader></AppHeader>
        </Header>
        <Content>
          <section className="success_payment-page">
            <section style={{ marginInline: '50px' }}>
              <section className="tac_title">
                <section className="tac_title-heading">
                  <h2 className="tac_title-heading">
                    {t('Terms')} &amp; {t('Conditions')}
                  </h2>
                  <i
                    style={{
                      fontSize: '0.45em',
                      color: '#999',
                      opacity: '0.7',
                    }}
                  >
                    16-12-2022
                  </i>
                </section>
              </section>
              <section className="tac_content">
                <h2 className="tac_content-heading">1. {t('Introduction')}</h2>
                <p className="tac_content-text">
                  {t(
                    'Thank you for utilizing the Pet88 platform, which is a web application for booking service in pet care'
                  )}
                </p>
              </section>
              <section className="tac_content">
                <h2 className="tac_content-heading">2. {t('Who may use the Pet88')}</h2>
                <p className="tac_content-text">
                  {t(
                    'The target users of Pet88 is pet ownner in Vietnam who want the new interactive UI'
                  )}
                </p>
              </section>
              <section className="tac_content">
                <h2 className="tac_content-heading">3. {t('The services Pet88 provide')}</h2>
                <p className="tac_content-text">
                  {t(
                    'The Service helps you to discover, view, and materialize the idea that helps improve the pet booking service in Vietnam'
                  )}
                </p>
              </section>
              <section className="tac_content">
                <h2 className="tac_content-heading">4. {t('Information you share with Pet88')}</h2>
                <p className="tac_content-text">
                  {t(
                    'We need specific information from you in order to provide you with our services'
                  )}
                </p>
              </section>
              <section className="tac_content">
                <h2 className="tac_content-heading">5. {t('Pet88 uses your information to')}</h2>
                <p className="tac_content-text">
                  {t(
                    'We use your information to authorize and authenticate your permission in Pet88, also used in the application UI to identify who you are.'
                  )}
                </p>
              </section>
              <section className="tac_title">
                <section className="tac_title-heading">
                  <i
                    style={{
                      fontSize: '0.45em',
                      color: '#999',
                      opacity: '0.7',
                    }}
                  >
                    {t('Effective as of')} 16-12-2022
                  </i>
                </section>
              </section>
            </section>
          </section>
        </Content>
      </Layout>
    </ConfigProvider>
  );
}
