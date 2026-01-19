import { useEffect, useRef } from 'react';
import { I18nextProvider } from 'react-i18next';
import { BrowserRouter, Routes } from 'react-router';
import { ToastContainer } from 'react-toastify';
import { ConfigProvider } from 'antd';


import i18n from 'i18next';

import ListRoutes from 'routes/ListRoutes';
import { ThemeProvider } from 'styled-components';
import antdConfig from '~/configs/antd.config.mjs';
import toastConfig from '~/configs/toast.config.mjs';
import { SearchContextProvider } from '~/context/SearchContext';

import { GlobalStyle } from '~/styles/global.style.js';
import { useAntdLocale } from './hooks/useAntdLocalize.jsx';

import routes from './routes/index.jsx';
import { MAINTENANCE_MODE } from '~/configs/app.config.mjs';
import Maintenance from "~/pages/Maintenance"
// import { AuthContextProvider } from 'context/AuthContext';

function App() {
	if (MAINTENANCE_MODE) {
		return <Maintenance />;
	}

	const locale = useAntdLocale();

	return (
		<>
			<GlobalStyle />
			{/* <AuthContextProvider> */}
			<I18nextProvider i18n={i18n}>
				<SearchContextProvider>
					<ConfigProvider locale={locale} theme={antdConfig} >
						<ToastContainer {...toastConfig} />
						<BrowserRouter>
							<Routes>{ListRoutes(routes)}</Routes>
						</BrowserRouter>
					</ConfigProvider>
				</SearchContextProvider>
			</I18nextProvider>
			{/* </AuthContextProvider> */}
		</>
	);
}

export default App;
