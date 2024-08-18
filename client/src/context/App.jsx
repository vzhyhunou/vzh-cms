import React, {
    createContext,
    useEffect,
    useState,
    useContext
} from 'react';

const Context = createContext();

export default ({provider, children, ...rest}) => {

    const [state, setState] = useState();

    useEffect(() => {
        provider.then(setState);
    }, [provider]);

    if (!state) {
        return null;
    }

    return <Context.Provider value={{
        ...state.default(rest),
        ...rest
    }}>
        {children}
    </Context.Provider>;
};

export const useContextProvider = () => useContext(Context);