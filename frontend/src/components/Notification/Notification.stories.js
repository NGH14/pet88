import { Notification } from './index.jsx';

export default {
  title: 'COMPONENTS/Notification',
  component: Notification,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],

  argTypes: { onClick: { action: 'closed' } },
};

const Template = args => <Notification {...args} />;
const configDefault = {
  message: 'This is message',
  autoCloseAfter: 5000,
  newestOnTop: false,
  progressHide: false,
  types: 'default',
  theme: 'colored',
};

export const defaultToast = Template.bind({});
defaultToast.args = {
  message: 'This is message',
  autoCloseAfter: 5000,
  newestOnTop: false,
  progressHide: false,
  types: 'default',
  theme: 'colored',
};

export const warningToast = Template.bind({});
warningToast.args = {
  ...configDefault,
  types: 'warning',
};
export const informationToast = Template.bind({});
informationToast.args = {
  ...configDefault,

  types: 'info',
};
export const errorToast = Template.bind({});
errorToast.args = {
  ...configDefault,

  types: 'error',
};
export const successToast = Template.bind({});
successToast.args = {
  ...configDefault,

  types: 'success',
};
export const darkMode = Template.bind({});
darkMode.args = {
  ...configDefault,

  theme: 'dark',
};
export const coloredMode = Template.bind({});
coloredMode.args = {
  ...configDefault,

  theme: 'colored',
};
