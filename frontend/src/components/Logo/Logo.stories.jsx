import { Logo } from './Logo.jsx';

export default {
	title: 'COMPONENTS/Logo',
	component: Logo,
	parameters: {
		layout: 'centered',
	},
	tags: ['autodocs'],
	args: {},
};
const Template = args => <Logo {...args} />;

export const defaultSpinner = Template.bind({});
