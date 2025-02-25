import React from 'react';
import { useTranslation } from 'react-i18next';
import { useLocation } from 'react-router';



import { Button, Form, Input } from 'antd';
import styled from 'styled-components';



import dogImg from '../../assets/images/Summer-Header.jpg';
import bgHeader from '../../assets/images/navy-bg.png';
import FormBookingHomepage from './../FormBookingHomepage/index';
import './style.css';





const HeroBlockStyled = styled.section`
	background:
		linear-gradient(rgba(0, 0, 0, 0.6), rgba(0, 0, 0, 0.2)),
		url(https://images.unsplash.com/photo-1494947665470-20322015e3a8?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D)
			no-repeat;
	height: 800px;
	-webkit-background-size: cover;
	-moz-background-size: cover;
	-o-background-size: cover;
	background-size: cover;
	border-radius: 10px;
	margin-inline: 3rem;

	@media only screen and (max-width: 425px) {
		background: linear-gradient(rgba(0, 0, 0, 0.6), rgba(0, 0, 0, 0.2)), no-repeat;
	}
`;

const HeroInlineStyled = styled.section``;

const HeroBlockStyledNormal = styled.section`
	background: linear-gradient(rgba(0, 0, 0, 0.1), rgba(0, 0, 0, 0.3)), url(${bgHeader});
	width: 100%;
	height: 120px;
`;

function HeroImageHomePage({ HeaderText }) {
	const locate = useLocation();

	const [t] = useTranslation();
	return (
		<HeroBlockStyled id="hero" className="heroBlock">
			<section className="content">
				<section className="herocontent-form">
					<FormBookingHomepage></FormBookingHomepage>
				</section>
			</section>
		</HeroBlockStyled>
	);
}

export default HeroImageHomePage;