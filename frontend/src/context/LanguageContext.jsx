import React, { createContext, useContext } from 'react';

const LanguageContext = createContext();

export const LanguageContextProvider = ({ children }) => {
	const [lang, setLang] = React.useState(
		localStorage.getItem('lang') || "en_US",
	);

	const SetLanguage = (lg) => {
		localStorage.setItem('lang', lg);
		setLang(lg);
	};

	return (
		<LanguageContext.Provider value={{ lang, SetLanguage }}>
			{children}
		</LanguageContext.Provider>
	);
};

export const UserLanguage = () => {
	return useContext(LanguageContext);
};
