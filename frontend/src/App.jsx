import { useEffect, useRef } from 'react';
import { I18nextProvider } from 'react-i18next';
import { BrowserRouter, Routes } from 'react-router';
import { ToastContainer } from 'react-toastify';

import { ConfigProvider } from 'antd';
import antdConfig from '@/configs/antd.config.mjs';
import toastConfig from '@/configs/toast.config.mjs';
// import { AuthContextProvider } from 'context/AuthContext';
import { SearchContextProvider } from '@/context/SearchContext';
import i18n from 'i18next';
import ListRoutes from 'routes/ListRoutes';
import { ThemeProvider } from 'styled-components';

import { GlobalStyle } from '@/styles/global.style.js';

import routes from './routes/index.jsx';

function App() {
	return (
		<>
			<GlobalStyle />
			{/* <AuthContextProvider> */}
			<I18nextProvider i18n={i18n}>
				<SearchContextProvider>
					<ConfigProvider theme={antdConfig}>
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
