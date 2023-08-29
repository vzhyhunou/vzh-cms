import React, {
    createContext,
    useEffect,
    useState,
    useContext,
    cloneElement
} from 'react';

import getLocaleProvider from './i18n/provider';

const AppContext = createContext();

export default ({locales, i18n, resources, data, auth, functions, basename, children, ...rest}) => {

    const [contextValues, setContextValues] = useState();

    useEffect(() => {
        Promise.all([resources, data, auth, functions]).then(s => s.map(r => r.default)).then(setContextValues);
    }, [i18n, resources, data, auth, functions]);

    if (!contextValues) {
        return null;
    }

    const [source, getDataProvider, getAuthProvider, getFuncProvider] = contextValues;
    const localeProvider = getLocaleProvider(i18n);
    const authProvider = getAuthProvider(source);
    const funcProvider = getFuncProvider(basename);
    const dataProvider = getDataProvider(source, localeProvider, authProvider, funcProvider);

    return <AppContext.Provider value={{
        localeProvider,
        funcProvider,
        ...rest
    }}>
        {cloneElement(children, {
            authProvider,
            dataProvider,
            locales
        })}
    </AppContext.Provider>;
};

export const useContextProvider = () => useContext(AppContext);
export const useLocaleProvider = () => useContextProvider().localeProvider;
export const useFuncProvider = () => useContextProvider().funcProvider;