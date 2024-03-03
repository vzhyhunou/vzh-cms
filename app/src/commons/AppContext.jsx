import React, {
    createContext,
    useEffect,
    useState,
    useContext
} from 'react';

const AppContext = createContext();

export default ({providers, children, ...rest}) => {

    const [state, setState] = useState();

    useEffect(() => {
        providers.then(r => r.default).then(p => p(rest)).then(setState);
    }, [providers]);

    if (!state) {
        return null;
    }

    return <AppContext.Provider value={{
        ...state,
        ...rest
    }}>
        {children}
    </AppContext.Provider>;
};

export const useContextProvider = () => useContext(AppContext);