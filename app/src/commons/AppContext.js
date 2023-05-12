import React, {
    createContext,
    useEffect,
    useState,
    useContext
} from 'react';

import {i18nLoader, i18nWriter} from './locale';

const AppContext = createContext();

export default ({i18n, data, components, roles, children}) => {

    const [contextValues, setContextValues] = useState();

    useEffect(() => {
        Promise.all([
            i18nLoader(i18n),
            data
        ]).then(props => setContextValues(props));
    }, [i18n, data]);

    if (!contextValues) {
        return null;
    }

    let [{locale, messages}, d] = contextValues;

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
        d
    }}>
        {children}
    </AppContext.Provider>;
};

export const useGetLocale = () => useContext(AppContext).getLocale;
export const useGetMessages = () => useContext(AppContext).getMessages;
export const useComponents = () => useContext(AppContext).components;
export const useRoles = () => useContext(AppContext).roles;
export const useData = () => useContext(AppContext).d;
