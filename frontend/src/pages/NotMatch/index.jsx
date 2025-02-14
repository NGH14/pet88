import './style.css';
import React from 'react';
import { useNavigate } from 'react-router';

import { Button } from '../../components/Button/index';
import CatVideo from '../../assets/video/pet_animation.mp4';
import CatPoster from '../../assets/images/cat_animation.webp';

export default function NotMatchPage() {
	const navigate = useNavigate();

	return (
		<section className='notfound'>
			<section className='notfound__text'>
				<h2 id='notfound_header'>404</h2>
				<h2 id='notfound_header'>Oops! Page for URL not found</h2>
				<p id='notfound_text'>
					We could not find the page you were looking for.
				</p>
				<section className='notfound__buttonwrapper'>
					<Button
						label='Back to Hompage'
						primary
						backgroundColor='rgb(49, 49, 44)'
						variant='contained'
						onClick={() => navigate('/', { replace: true })}
					>
						Return to homepage
					</Button>
				</section>
			</section>
			<video
				loop
				playsinline='playsinline'
				className='autoplay-video'
				preload='auto'
				data-autoplay
				src={CatVideo}
				poster={CatPoster}
				data-expand='-10'
				autoPlay
				muted
			/>
		</section>
	);
}
