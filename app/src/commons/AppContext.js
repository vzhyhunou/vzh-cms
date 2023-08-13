import React, {
    createContext,
    useEffect,
    useState,
    useContext,
    cloneElement
} from 'react';

import getLocaleProvider from './locale';
import srcLoader from './source';

const AppContext = createContext();

export default ({locales, i18n, resources, data, auth, functions, basename, children, ...rest}) => {

    const [contextValues, setContextValues] = useState();

    useEffect(() => {
        Promise.all([
            srcLoader(resources),
            srcLoader(data),
            srcLoader(auth),
            srcLoader(functions)
        ]).then(props => setContextValues(props));
    }, [i18n, resources, data, auth, functions]);

    if (!contextValues) {
        return null;
    }

    const [source, getDataProvider, getAuthProvider, getFuncProvider] = contextValues;
    const localeProvider = getLocaleProvider(i18n);
    const authProvider = getAuthProvider(source);
    const dataProvider = getDataProvider(source, localeProvider, authProvider);
    const funcProvider = getFuncProvider(basename);

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

export const useLocaleProvider = () => useContext(AppContext).localeProvider;
export const useComponents = () => useContext(AppContext).components;
export const useRoles = () => useContext(AppContext).roles;
export const useFuncProvider = () => useContext(AppContext).funcProvider;
