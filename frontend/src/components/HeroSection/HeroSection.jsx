import React from 'react';
import { useTranslation } from 'react-i18next';
import { useLocation } from 'react-router';

import { Button, Form, Input } from 'antd';
import dogImg from 'assets/images/Summer-Header.jpg';
import bgHeader from 'assets/images/navy-bg.png';
import FormBookingHomepage from 'components/FormBookingHomepage/index';
import styled from 'styled-components';

import {
	HeroBlockStyled,
	RatingSection,
	TextContainer,
	FormContainer,
} from './HeroSection.style.mjs';

import './style.css';

function HeroImageHomePage({ HeaderText }) {
	const locate = useLocation();
	const { t } = useTranslation();
	const RATING = 4.6;
	return (
		<HeroBlockStyled id="hero" className="heroBlock">
			<FormContainer>
				<FormBookingHomepage />
			</FormContainer>
			<TextContainer>
				<RatingSection rate={RATING}>
					<p>{RATING}</p>
				</RatingSection>
				<p>
					{t('from')} 8386 {t('reviews')}
				</p>
			</TextContainer>
		</HeroBlockStyled>
	);
}

export default HeroImageHomePage;
