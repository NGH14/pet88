import React from 'react';
import { createRoot } from 'react-dom/client';

import App from './App';
import 'utils/i18n/index.js';

const root = createRoot(document.getElementById('root'));
root.render(<App />);
