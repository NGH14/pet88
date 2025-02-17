import { Notification } from 'components/Notification/';

export default {
  title: 'COMPONENTS/Spinner',
  component: Notification,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],

  argTypes: { onClick: { action: 'closed' } },
};
const 