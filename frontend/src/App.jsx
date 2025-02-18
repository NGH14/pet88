import * as React from 'react';
import { ThemeProvider } from 'styled-components';
import { I18nextProvider } from 'react-i18next';
import { BrowserRouter, Routes } from 'react-router';
import { AuthContextProvider } from 'context/AuthContext';
import { ToastContainer } from 'react-toastify';
import { SearchContextProvider } from 'context/SearchContext';
import { ConfigProvider } from 'antd';
import { routes } from './routes/';
import ListRoutes from 'routes/ListRoutes';
import i18n from 'i18next';

import 'react-toastify/dist/ReactToastify.css';
import 'styles/style.css';
import { GlobalStyle } from 'styles/global.style.js';

function App() {
	return (
		<>
			<GlobalStyle />
			<AuthContextProvider>
				<I18nextProvider i18n={i18n}>
					<SearchContextProvider>
						{/* <ThemeProvider> */}
						<ConfigProvider theme={{ cssVar: true, hashed: false }}>
							<BrowserRouter>
								<ToastContainer
									position='top-right'
									autoClose={3500}
									hideProgressBar={false}
									newestOnTop={false}
									closeOnClick
									pauseOnFocusLoss
									draggable
									pauseOnHover
									theme='light'
								/>
								<Routes>{ListRoutes(routes)}</Routes>
							</BrowserRouter>
						</ConfigProvider>
						{/* </ThemeProvider> */}
					</SearchContextProvider>
				</I18nextProvider>
			</AuthContextProvider>
		</>
	);
}

export default App;
