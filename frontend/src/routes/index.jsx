import { lazy } from 'react';

import Routesconfig from './config.mjs';

const lazyImport = path => lazy(() => import(`~/pages/${path}/index.jsx`));

const routes = routesConfig.map(route => ({
	...route,
	element: lazyImport(route.element),
	private: !!route.private,
}));

export default routes;
