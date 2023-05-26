import React, {
    createContext,
    useEffect,
    useState,
    useContext
} from 'react';

import i18nLoader from './locale';
import providerLoader from './provider';

const AppContext = createContext();

export default ({i18n, data, auth, children, ...rest}) => {

    const [contextValues, setContextValues] = useState();

    useEffect(() => {
        Promise.all([
            i18nLoader(i18n),
            providerLoader(data),
            providerLoader(auth)
        ]).then(props => setContextValues(props));
    }, [i18n, data, auth]);

    if (!contextValues) {
        return null;
    }

    let [localeProvider, dataProvider, authProvider] = contextValues;

    return <AppContext.Provider value={{
        localeProvider,
        ...rest,
        dataProvider,
        authProvider
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
