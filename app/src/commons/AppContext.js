import React, {
    createContext,
    useEffect,
    useState,
    useContext
} from 'react';

import i18nLoader from './locale';
import srcLoader from './data';

const AppContext = createContext();

export default ({i18n, src, components, roles, children}) => {

    const [contextValues, setContextValues] = useState();

    useEffect(() => {
        Promise.all([
            i18nLoader(i18n),
            srcLoader(src)
        ]).then(props => setContextValues(props));
    }, [i18n, src]);

    if (!contextValues) {
        return null;
    }

    let [localeProvider, data] = contextValues;

    return <AppContext.Provider value={{
        localeProvider,
        components,
        roles,
        data
    }}>
        {children}
    </AppContext.Provider>;
};

export const useGetLocale = () => useContext(AppContext).localeProvider.getLocale;
export const useGetMessages = () => useContext(AppContext).localeProvider.getMessages;
export const useComponents = () => useContext(AppContext).components;
export const useRoles = () => useContext(AppContext).roles;
export const useData = () => useContext(AppContext).data;
