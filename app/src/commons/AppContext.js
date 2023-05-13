import React, {
    createContext,
    useEffect,
    useState,
    useContext
} from 'react';

import {i18nLoader, i18nWriter} from './locale';
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

    let [{locale, messages}, data] = contextValues;

    const getLocale = () => locale;

    const getMessages = l => l && l !== locale ? i18nWriter(i18n, l).then(m => {
        locale = l;
        messages = m;
        return m;
    }) : messages;

    return <AppContext.Provider value={{
        getLocale,
        getMessages,
        components,
        roles,
        data
    }}>
        {children}
    </AppContext.Provider>;
};

export const useGetLocale = () => useContext(AppContext).getLocale;
export const useGetMessages = () => useContext(AppContext).getMessages;
export const useComponents = () => useContext(AppContext).components;
export const useRoles = () => useContext(AppContext).roles;
export const useData = () => useContext(AppContext).data;
