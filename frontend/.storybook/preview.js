/** @type { import('@storybook/react').Preview } */

const parameters = {
  options: {
    storySort: {
      method: 'alphabetical',
      order: [
        'Overview',
        'Components',
        'Contexts',
        'Hooks',
      ],
      locales: '',
    },
  },
};

const preview = {
  parameters: {
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/i,
      },
    },
  },
};

export default preview;
