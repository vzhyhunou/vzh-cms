import React, {
    createContext,
    useEffect,
    useState,
    useContext,
    cloneElement
} from 'react';

import i18nLoader from './locale';
import srcLoader from './source';
import functions from './functions';

const AppContext = createContext();

export default ({locales, i18n, resources, data, auth, basename = '', children, ...rest}) => {

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
    const funcProvider = functions(basename);

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
