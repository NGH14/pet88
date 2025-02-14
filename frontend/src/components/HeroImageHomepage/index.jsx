import React from 'react';
import { Button, Form, Input } from 'antd';
import styled from 'styled-components';
import './style.css';
import { useTranslation } from 'react-i18next';
import dogImg from '../../assets/images/Summer-Header.jpg';
import bgHeader from '../../assets/images/navy-bg.png';

import { useLocation } from 'react-router';
import FormBookingHomepage from './../FormBookingHomepage/index';

const HeroBlockStyled = styled.section`
	background: linear-gradient(rgba(0, 0, 0, 0.6), rgba(0, 0, 0, 0.2)),
		url(${dogImg}) no-repeat;
	width: 100%;
	-webkit-background-size: cover;
	-moz-background-size: cover;
	-o-background-size: cover;
	background-size: cover;

	@media only screen and (max-width: 425px) {
		background: linear-gradient(rgba(0, 0, 0, 0.6), rgba(0, 0, 0, 0.2)),
			no-repeat;
	}
`;

const HeroInlineStyled = styled.section``;

const HeroBlockStyledNormal = styled.section`
	background: linear-gradient(rgba(0, 0, 0, 0.1), rgba(0, 0, 0, 0.3)),
		url(${bgHeader});
	width: 100%;

	height: 120px;
`;

function HeroImageHomePage({ HeaderText }) {
	const locate = useLocation();

	const [t] = useTranslation();
	return (
		<section>
			{(() => {
				switch (locate.pathname) {
					case '/':
						return (
							<HeroBlockStyled id='hero' className='heroBlock'>
								<section className='content'>
									{/* <h3 className='content-title'>
										{t(
											'established & trusted pet care service',
										)}
									</h3> */}
									<section className='herocontent-form'>
										<FormBookingHomepage></FormBookingHomepage>
									</section>
								</section>
							</HeroBlockStyled>
						);

					case '/account':
						return (
							<HeroInlineStyled
								id='hero'
								className='heroInline'></HeroInlineStyled>
						);

					default:
						return (
							<HeroInlineStyled
								id='hero'
								className='heroInline'></HeroInlineStyled>
						);
				}
			})()}
		</section>
	);
}

export default HeroImageHomePage;
