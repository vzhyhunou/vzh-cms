import React, {
    createContext,
    useContext
} from 'react';

const ComponentContext = createContext();

export default ({children}) => {

    let bindings = {};

    const getBindings = () => bindings;

    const setBindings = props => {
        bindings = {...bindings, ...props};
    };

    return <ComponentContext.Provider value={{
        getBindings,
        setBindings
    }}>
        {children}
    </ComponentContext.Provider>;
};

export const useGetBindings = () => useContext(ComponentContext).getBindings;
export const useSetBindings = () => useContext(ComponentContext).setBindings;
