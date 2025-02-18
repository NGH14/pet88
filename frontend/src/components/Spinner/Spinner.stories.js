import { Spinner } from './index.jsx';

export default {
  title: 'COMPONENTS/Spinner',
  component: Spinner,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  args: {},
};
const Template = args => <Spinner {...args} />;

export const defaultSpinner = Template.bind({});

defaultSpinner.args = {
  wrapHeight: '100%',
  iconSize: '100px',
};
