import React from 'react';
import { createRoot } from 'react-dom/client';
import { Helmet, HelmetProvider } from 'react-helmet-async';

import '~/utils/i18n/index.mjs';

import App from './App';

const root = createRoot(document.getElementById('root'));
root.render(
	<HelmetProvider>
		<App />
	</HelmetProvider>
);
