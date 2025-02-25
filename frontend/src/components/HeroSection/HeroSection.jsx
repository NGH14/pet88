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
					<svg
						width="20"
						height="20"
						viewBox="0 0 18 18"
						fill="currentColor"
						xmlns="http://www.w3.org/2000/svg"
						aria-hidden="true"
						focusable="false">
						<path
							d="M10.546 1.97c-.62-1.293-2.471-1.293-3.092 0L6.36 4.248c-.254.53-.765.892-1.351.959L2.52 5.49c-1.47.168-2.05 1.986-.947 2.967l1.757 1.56a1.7 1.7 0 01.537 1.616l-.479 2.314c-.293 1.419 1.213 2.533 2.494 1.844l2.302-1.238a1.721 1.721 0 011.63 0l2.302 1.238c1.28.689 2.787-.425 2.493-1.844l-.478-2.314a1.7 1.7 0 01.537-1.616l1.756-1.56c1.104-.981.524-2.8-.946-2.967l-2.488-.283a1.714 1.714 0 01-1.351-.96L10.546 1.97z"
							fill="currentColor"></path>
					</svg>
				</RatingSection>
				<p>
					{t('from')} 8386 {t('reviews')}
				</p>
			</TextContainer>
		</HeroBlockStyled>
	);
}

export default HeroImageHomePage;
