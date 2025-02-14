import * as React from 'react';
import { I18nextProvider } from 'react-i18next';
import { BrowserRouter, Routes } from 'react-router';

import { AuthContextProvider } from 'context/AuthContext';
import { ToastContainer } from 'react-toastify';
import i18n from 'i18next';
import { LanguageContextProvider } from 'context/LanguageContext';
import { SearchContextProvider } from 'context/SearchContext';
import ListRoutes from 'routes/ListRoutes';

import { routes } from './routes/';
import 'react-toastify/dist/ReactToastify.css';

import './index.css';
import './App.css';

function App() {
	return (
		<AuthContextProvider>
			<LanguageContextProvider>
				<I18nextProvider i18n={i18n}>
					<SearchContextProvider>
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
					</SearchContextProvider>
				</I18nextProvider>
			</LanguageContextProvider>
		</AuthContextProvider>
	);
}

export default App;
