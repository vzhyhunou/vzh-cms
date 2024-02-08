import React, {
    createContext,
    useEffect,
    useState,
    useContext
} from 'react';

import getLocaleProvider from './i18n/provider';

const AppContext = createContext();

export default ({resources, data, auth, functions, children, ...rest}) => {

    const [providers, setProviders] = useState();

    useEffect(() => {
        Promise.all([resources, data, auth, functions]).then(s => s.map(r => r.default)).then(setProviders);
    }, [resources, data, auth, functions]);

    if (!providers) {
        return null;
    }

    const [resProvider, getDataProvider, getAuthProvider, getFuncProvider] = providers;
    const localeProvider = getLocaleProvider(rest);
    const funcProvider = getFuncProvider(rest);
    const authProvider = getAuthProvider({resProvider, ...rest});
    const dataProvider = getDataProvider({resProvider, localeProvider, funcProvider, authProvider, ...rest});

    return <AppContext.Provider value={{
        localeProvider,
        funcProvider,
        authProvider,
        dataProvider,
        ...rest
    }}>
        {children}
    </AppContext.Provider>;
};

export const useContextProvider = () => useContext(AppContext);