import React, {
    createContext,
    useEffect,
    useState,
    useContext
} from 'react';

import i18nLoader from './locale';
import dataLoader from './data';

const AppContext = createContext();

export default ({i18n, data, children, ...rest}) => {

    const [contextValues, setContextValues] = useState();

    useEffect(() => {
        Promise.all([
            i18nLoader(i18n),
            dataLoader(data)
        ]).then(props => setContextValues(props));
    }, [i18n, data]);

    if (!contextValues) {
        return null;
    }

    let [localeProvider, dataProvider] = contextValues;

    return <AppContext.Provider value={{
        localeProvider,
        ...rest,
        dataProvider
    }}>
        {children}
    </AppContext.Provider>;
};

export const useLocaleProvider = () => useContext(AppContext).localeProvider;
export const useLocales = () => useContext(AppContext).locales;
export const useComponents = () => useContext(AppContext).components;
export const useRoles = () => useContext(AppContext).roles;
export const useDataProvider = () => useContext(AppContext).dataProvider;
