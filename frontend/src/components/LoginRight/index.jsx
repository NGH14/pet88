import React from 'react';
import { useTranslation } from 'react-i18next';

import photo2 from '../../assets/images/Wallpaper-Linz-Doggies-Turquiose-1.webp';
import photo1 from '../../assets/images/j-balla-photography-cMtiWjiAvq4-unsplash-_1_.webp';
import photo3 from '../../assets/images/page-image.60943b86 (1).webp';
import './style.css';

const RightSideLogin = () => {
	const listImgs = [photo1, photo3, photo2];
	const [t] = useTranslation();

	const img = listImgs[Math.floor(Math.random() * listImgs.length)];

	return (
		<>
			<section className="loginpage-rightside">
				<img src={img} alt="" className="loginpage-rightside_image" />
				<p className="loginpage-rightside_textoverlay">
					{t('You will be so happy with our paw-positively adorable pet care service')}.<br></br>
					<span className="loginpage-rightside_smalltext">
						{t('Pet88 is made with ❤️ for pets')}
					</span>
				</p>
			</section>
		</>
	);
};

export default React.memo(RightSideLogin);
