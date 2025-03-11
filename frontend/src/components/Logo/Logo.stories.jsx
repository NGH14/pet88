import { Logo } from './Logo.jsx';


export default {
	title: 'COMPONENTS/Logo',
	component: Logo,
	parameters: {
		// Optional parameter to center the component in the Canvas. More info: https://storybook.js.org/docs/configure/story-layout
		layout: 'centered',
	},
	tags: ['autodocs'],
};

const Template = args => <Logo {...args} />;

export const Default = Template.bind({});