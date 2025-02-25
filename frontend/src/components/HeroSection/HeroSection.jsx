import React from 'react';
import { useTranslation } from 'react-i18next';
import { useLocation } from 'react-router';

import { Button, Form, Input } from 'antd';
import dogImg from 'assets/images/Summer-Header.jpg';
import bgHeader from 'assets/images/navy-bg.png';
import FormBookingHomepage from 'components/FormBookingHomepage/index';
import styled from 'styled-components';

import { HeroBlockStyled, RatingSection, TextContainer } from './HeroSection.style.mjs';

import './style.css';

function HeroImageHomePage({ HeaderText }) {
	const locate = useLocation();
	const { t } = useTranslation();
	return (
		<HeroBlockStyled id="hero" className="heroBlock">
			<section className="content">
				<section className="herocontent-form">
					<FormBookingHomepage />
				</section>
			</section>
			<TextContainer>
				<RatingSection>
					<p>4.6</p>

				</RatingSection>
				<p>
					{t('from')} 8386 {t('reviews')}
				</p>
			</TextContainer>
		</HeroBlockStyled>
	);
}

export default HeroImageHomePage;
