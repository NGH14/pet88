import IMG_1_PNG from '~/assets/images/customer-brand/customer-logo-2.png';
import IMG_2_PNG from '~/assets/images/customer-brand/customer-logo-2.png';
import IMG_3_PNG from '~/assets/images/customer-brand/customer-logo-3.png';

import Slider from './Slider.jsx';

export default {
	title: 'Components/Slider',
	component: Slider,
};

const Template = args => <Slider {...args} />;

export const Default = Template.bind({});
Default.args = {
	data: [
		<img src={IMG_1_PNG} alt="slide 1" />,
		<img src={IMG_2_PNG} alt="slide 2" />,
		<img src={IMG_3_PNG} alt="slide 3" />,
	],
};
