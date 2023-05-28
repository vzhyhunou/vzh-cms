import React, {
    createContext,
    useEffect,
    useState,
    useContext
} from 'react';

import i18nLoader from './locale';
import srcLoader from './source';

const AppContext = createContext();

export default ({i18n, resources, data, auth, children, ...rest}) => {

    const [contextValues, setContextValues] = useState();

    useEffect(() => {
        Promise.all([
            i18nLoader(i18n),
            srcLoader(resources),
            srcLoader(data),
            srcLoader(auth)
        ]).then(props => setContextValues(props));
    }, [i18n, resources, data, auth]);

    if (!contextValues) {
        return null;
    }

    const [localeProvider, source, getDataProvider, getAuthProvider] = contextValues;
    const authProvider = getAuthProvider(source);
    const dataProvider = getDataProvider(source, localeProvider.getLocale, authProvider.getToken);

    return <AppContext.Provider value={{
        localeProvider,
        dataProvider,
        authProvider,
        ...rest
    }}>
        {children}
    </AppContext.Provider>;
};

export const useLocaleProvider = () => useContext(AppContext).localeProvider;
export const useLocales = () => useContext(AppContext).locales;
export const useComponents = () => useContext(AppContext).components;
export const useRoles = () => useContext(AppContext).roles;
export const useDataProvider = () => useContext(AppContext).dataProvider;
export const useAuthProvider = () => useContext(AppContext).authProvider;
