import { useState } from 'react';
import ReactBeforeSliderComponent from 'react-before-after-slider-component';
import 'react-before-after-slider-component/dist/build.css';
import { Helmet } from 'react-helmet-async';
import { useTranslation } from 'react-i18next';
import ScrollTrigger from 'react-scroll-trigger';

import { HeartTwoTone } from '@ant-design/icons';
import { ConfigProvider } from 'antd';
import viVN from 'antd/es/locale/vi_VN';
import serviceImg1 from 'assets/images/Illustration-Bond.png';
import serviceImg2 from 'assets/images/Illustration-Schedule.png';
import FIRST from 'assets/images/dog-grooming-photography-1.jpg';
import SECOND from 'assets/images/dog-grooming-photography-2.jpg';
import { HeroSection } from 'components/HeroSection';
import i18n from 'i18next';
import MainLayout from 'layouts/MainLayout';
import { motion } from 'motion/react';
import { NAMESPACE } from '~/utils/i18n/config.mjs';

import { LightBackground } from './HomePage.style.mjs';

import PARTNER_IMAGE from './data/partnerImage.mjs';
import partnerImage from './data/partnerImage.mjs';
import STATISTIC_GROW_UP from './data/stats.mjs';
import './style.css';
import GrowingUpSection from './views/GrowingUpSection';
import {HomeSlider} from './views/PartnerSlider';

const cardVariants = {
	offscreen: {
		y: 120,
	},
	onscreen: {
		y: 0,
		transition: {
			bounce: 0.2,
			duration: 0.2,
		},
	},
};

function HomePage() {
	const { t } = useTranslation(NAMESPACE.homePageNS);
	const [countUp, setCountUp] = useState(false);

	return (
		<MainLayout>
			<HeroSection />
			<section className="homepage_whitebackground">
				<section className="homepage-content_flex">
					<section className="homepage-content_flexText">
						<h3 className="homepage-content_title">
							{t('stay motivated and build better relationships')}
						</h3>
						<p>
							{t(
								'healthy work relationships necessitate clear, consistent, honest, and open communication, which is the foundation of trust, without which no relationship can thrive'
							)}
						</p>
					</section>

					<section>
						<img src={serviceImg1} alt="" className="homepage-content_flexImg" />
					</section>
				</section>
				<section className="wrap-content">
					<p>{t('leading partner')}</p>
					<HomeSlider
						data={PARTNER_IMAGE}
						config={{
							slidesPerView: 5,
							spaceBetween: 10,
							speed: 3000,
							allowTouchMove: false,
							autoplay: { delay: 1000 },
							loop: true,
						}}
					/>
				</section>
			</section>

			<LightBackground>
				<section className="homepage-servicecontent" variants={cardVariants}>
					<h3 className="homepage-servicecontent_title">
						{t('one platform, everything pet service')}
					</h3>
					<p>
						{t(
							'Pet88 is dedicated to providing the best quality care for your pet. We offer the service, depending on your needs.We strive to be the most dependable and accessible service in Vietnam and will go the extra distance to give you precisely what you are looking for in pet care'
						)}
					</p>
				</section>

				<ScrollTrigger onEnter={() => setCountUp(true)}>
					{countUp && <GrowingUpSection stats={STATISTIC_GROW_UP} />}
				</ScrollTrigger>

				<section id="about" className="homepage-servicecontent" variants={cardVariants}>
					<h3 className="homepage-servicecontent_title">{t('about')} Pet88</h3>
					<p className="homepage-servicecontent_text">
						{t(
							'The first goal of the project is to research and analyze the potential and the benefit of speed, simplicity, interoperability, versatility, and most important global platform support from the modern browser as Chrome, Firefox, etc. which is supported in the JavaScript programming language ecosystem in the booking pet service, includes a map, scheduler, notification, etc'
						)}
					</p>
					<p className="homepage-servicecontent_text">
						{t(
							'Drag & Drop Calendar is a calendar app that has Schedule, Week Agenda, Month, Day, and Week modes, and lets you drag and drop events from one day, week, or month to another in the manager.'
						)}
					</p>
					<section
						style={{
							display: 'flex',
							justifyContent: 'center',
						}}>
						<img src={serviceImg2} alt="" className="homepage-content_subflexImg" />
					</section>
				</section>

				<section id="service_section" className="homepage-servicecontent" variants={cardVariants}>
					<h3 className="homepage-servicecontent_title">{t('service')} Pet88</h3>
					<p className="homepage-servicecontent_text">
						{t(
							'The interactive user interface includes two main views categories based on the user role, one for the customer who has the demand to book the pet service and another one for the manager and staff who can manage the system that not only CRUD but also other interaction like download, drag and drop to modify the service booking, etc'
						)}
					</p>
					<p className="homepage-servicecontent_text">
						{t(
							'The service helps to communicate between the front-end app and the database, which also store the keys to connect the third-party service, for example, this project has used the APIs from Firebase to store and authenticate the user by the Google account'
						)}
					</p>
				</section>
			</LightBackground>
			<motion.section
				initial="offscreen"
				whileInView="onscreen"
				viewport={{ once: true, amount: 0.8 }}>
				<p className="title-homepage">{t('Service makes the difference')}</p>
				<motion.section className="slider-beforeafter" variants={cardVariants}>
					<section className="slider-contain">
						<ReactBeforeSliderComponent
							currentPercentPosition="40"
							firstImage={{ imageUrl: FIRST }}
							secondImage={{ imageUrl: SECOND }}
						/>
					</section>
					<section className="slider-text">
						<h2 className="slider-text_header">
							"{t('You take care of pets. We take care of you')}."
						</h2>
						<p className="slider-text_span">Pet88</p>
					</section>
				</motion.section>
			</motion.section>
		</MainLayout>
	);
}
export default HomePage;
